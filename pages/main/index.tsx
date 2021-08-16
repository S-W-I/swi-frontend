import React from "react";
import Head from "next/head";

import { Subject } from "rxjs";
import { isNil } from "lodash";
import { debounceTime } from "rxjs/operators";

import FileDownload from "js-file-download";

import { IDEActionSection } from "components/core/ActionSection";
import { MainLogConsole } from "components/core/editing/LogConsole";

import {
  FileSystemEntity,
  FileSystemEntityKind,
  FileSystemEntityMeta,
  FileSystemSnake,
} from "parser/file";

import {
  HomeContainer,
  Footer,
  ApplicationColor,
  FilesystemSection,
  IDEActionsFlex,
  LogoContainer,
  MainTabSection,
  ViewSelectSection,
} from "./styled";
import {
  MainEditingBody,
  EditingBodyProps,
} from "components/core/editing/EditBody";

import { MediumHeading } from "components/common/Text/styled";

// import { Checkbox } from "components/common/Checkbox";
// import { SelectList } from "components/common/SelectList";

import { ExplorerFileSystem } from "components/core/fs/ExplorerFileSystem";
import {
  CompilerSection,
  CompilerProps,
} from "components/core/compiler/CompilerSection";

import {
  ExplorerHeadingContainer,
  FileExplorerHeading,
  FileExplorerSubHeading,
  ExplorerWorkspaceLabel,
} from "components/core/fs/ExplorerFileSystem/styled";
import { SessionClient } from "services/fs";
import { LocalStorageManager, useLocalStorage } from "hooks/localStorage";
import {
  CompilationInfo,
  SessionLegacyNode,
  SessionTree,
} from "protobuf/session";
import { UpdateSessionBody } from "protobuf/transport";

const sourceCodeFixture = require("fixtures/sc.json") as { sc: string };

enum SectionType {
  FileExplorers = 0,
  Compiler,
  Transactions,
}

type EditableFileSystem = Record<string, string>;

type FileSystemState = {
  state: EditableFileSystem;
  filesystem: FileSystemSnake;
};

type Section = { text: string };
const ideSectionList: Section[] = [
  {
    text: "File Explorers",
  },
  {
    text: "Compiler",
  },
  // {
  //   text: "Transactions",
  // },
];

const sessionClient = new SessionClient({ endpoint: "http://localhost:8081" });

export default function Home() {
  const [compileInfo, setCompileInfo] = React.useState<CompilationInfo | null>(
    null
  );
  const [isCompilationProcessing, setIsCompilationProcessing] =
    React.useState(false);
  const [compileCodeSubject] = React.useState(new Subject<null>());

  console.log({ compileInfo });

  React.useEffect(() => {
    const subscription = compileCodeSubject
      .pipe(debounceTime(300))
      .subscribe(async () => {
        setIsCompilationProcessing(true);
        setCompileInfo(null);

        const compilationInfo = await sessionClient.compileSessionCode(
          sessionId
        );

        setCompileInfo(compilationInfo);
        setIsCompilationProcessing(false);
      });

    return () => subscription.unsubscribe();
  }, []);

  const [codeUpdateSubject] = React.useState(
    new Subject<{ [x: string]: string }>()
  );
  React.useEffect(() => {
    const subscription = codeUpdateSubject
      .pipe(debounceTime(300))
      .subscribe(async (updateEntry) => {
        const firstKey = Object.keys(updateEntry)[0];
        const payload = Object.assign({}, updateEntry);

        const buff = Buffer.from(payload[firstKey]);
        const base64data = buff.toString("base64");

        payload[firstKey] = base64data;

        await sessionClient.updateSessionCode(
          UpdateSessionBody.fromJSON({
            session_id: sessionId,
            tree: payload,
          })
        );
      });

    return () => subscription.unsubscribe();
  }, []);

  const [currentSection, setCurrentSection] = React.useState(
    SectionType.FileExplorers
    // SectionType.Compiler
  );

  const [currentSessionTree, setSessionTree] =
    React.useState<SessionTree | null>(null);
  const [currentSessionLegacyTree, setSessionLegacyTree] = React.useState<
    SessionLegacyNode[] | null
  >(null);

  const [sessionId, setSessionValue] = useLocalStorage(
    LocalStorageManager.SESSION_ID,
    null
  );

  React.useEffect(() => {
    (async () => {
      const session = await sessionClient.fetchSessionCodeTree(sessionId);
      const sessionLegacy = await sessionClient.fetchSessionCodeLegacyTree(
        sessionId
      );

      setSessionTree(session);
      setSessionLegacyTree(sessionLegacy);
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      if (sessionId === null) {
        const freshSessionId = await sessionClient.initNewSession();
        setSessionValue(freshSessionId.session_id);
      }
    })();
  }, [sessionId]);

  const [currentSelectedFile, setCurrentSelectedFile] =
    React.useState<FileSystemEntity | null>(null);

  const [sourceCodeState, setSourceCodeState] =
    React.useState<EditableFileSystem>({});

  React.useEffect(() => {
    if (isNil(currentSessionTree)) {
      return;
    }

    const keys = Object.keys(currentSessionTree.file_paths);
    for (let i = 0; i < keys.length; i++) {
      const splittedPath = keys[i].split("/");
      const path = splittedPath.slice(1).join("/");

      const value = currentSessionTree.file_paths[keys[i]];
      const buff = Buffer.from(value, "base64");
      const text = buff.toString("utf8");

      const newSourceCode = sourceCodeState;
      newSourceCode[path] = text;
      setSourceCodeState(newSourceCode);
    }
  }, [currentSessionTree]);

  const [filesystemStructure, setFileSystemStructure] =
    React.useState<FileSystemSnake | null>(null);

  const editableFileSystem: FileSystemState = {
    state: sourceCodeState,
    filesystem: filesystemStructure,
  };

  React.useEffect(() => {
    (async () => {
      // const filesystem = await ideService.fetchData();
      if (isNil(currentSessionLegacyTree)) {
        return;
      }
      // console.log({ filesystem })
      const result: FileSystemEntity[] = [];

      const populate = (
        inputFs: SessionLegacyNode[] | null,
        levelCache: FileSystemEntity[]
      ) => {
        console.log({ inputFs });
        if (isNil(inputFs)) {
          return;
        }

        for (let i = 0; i < inputFs.length; i++) {
          const entity = inputFs[i];

          if (entity.is_file) {
            levelCache.push(FileSystemEntity.new_file({ name: entity.name }));
          } else {
            const thisCache = [];

            populate(entity.children, thisCache);

            levelCache.push(
              FileSystemEntity.dir_with_entities(
                { name: entity.name },
                thisCache
              ).populateDepth()
            );
          }
        }
      };
      populate(currentSessionLegacyTree, result);

      setFileSystemStructure(new FileSystemSnake(result));
    })();
  }, [currentSessionLegacyTree]);

  const currentEntityFilePath = currentSelectedFile?.currentEntityFilePath;

  const editingBodyProps: EditingBodyProps = {
    compileInfo,
    sourceCode: sourceCodeState[currentEntityFilePath],
    filename: currentSelectedFile?.currentEntityFilePath,
    onSourceCodeChange: (newCode) => {
      const newState = Object.assign({}, sourceCodeState, {
        [currentEntityFilePath]: newCode,
      });

      setSourceCodeState(newState);

      codeUpdateSubject.next({
        [`${sessionId}/${currentEntityFilePath}`]: newCode,
      });
      // await sessionClient.
    },
  };

  const compilerProps: CompilerProps = {
    currentFile: currentSelectedFile,
    isProcessing: isCompilationProcessing,
    compileInfo,
    onCompile: () => {
      compileCodeSubject.next(null);
    },
    onDownload: async () => {
      const data = await sessionClient.downloadSessionCompiledCode(sessionId);
      FileDownload(data, "helloworld.so");
    },
  };

  const sectionsMapping = {
    [SectionType.FileExplorers]: (
      <FilesystemSection className="separator">
        <ExplorerHeadingContainer>
          <FileExplorerHeading>File Explorers</FileExplorerHeading>
          <FileExplorerSubHeading>Workspaces</FileExplorerSubHeading>
        </ExplorerHeadingContainer>
        <ExplorerWorkspaceLabel>default_workspace</ExplorerWorkspaceLabel>
        {!isNil(editableFileSystem.filesystem) && (
          <ExplorerFileSystem
            filesystem={editableFileSystem.filesystem}
            onSelectFile={(filename) => setCurrentSelectedFile(filename)}
          />
        )}
      </FilesystemSection>
    ),
    [SectionType.Compiler]: (
      <FilesystemSection className="separator">
        <ExplorerHeadingContainer>
          <FileExplorerHeading>Solana Compiler</FileExplorerHeading>
          {/* <FileExplorerSubHeading>Workspaces</FileExplorerSubHeading> */}

          <CompilerSection {...compilerProps} />
        </ExplorerHeadingContainer>
      </FilesystemSection>
    ),
  };
  const currentSectionComponent = sectionsMapping[currentSection];

  return (
    <div className="container">
      <Head>
        <title>SWI | Solana Web Interface</title>
        <link rel="icon" href="/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <HomeContainer>
        <ViewSelectSection className="separator">
          <LogoContainer>
            <img src="/app/logo.svg" />
            <MediumHeading>SWI</MediumHeading>
          </LogoContainer>

          <IDEActionsFlex>
            {ideSectionList.map((x, i) => (
              <IDEActionSection
                key={x.text}
                checked={i === currentSection}
                onSelect={() => i >= 0 && i <= 1 && setCurrentSection(i)}
              >
                {x.text}
              </IDEActionSection>
            ))}
          </IDEActionsFlex>
        </ViewSelectSection>

        {currentSectionComponent}
        <MainTabSection>
          {!isNil(currentSelectedFile) && (
            <MainEditingBody {...editingBodyProps} />
          )}
        </MainTabSection>
      </HomeContainer>
      <Footer />

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: Poppins, -apple-system, BlinkMacSystemFont, Segoe UI,
            Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
            Helvetica Neue, sans-serif;
          background-color: ${ApplicationColor.MAIN_BG};
        }

        .container {
          height: 100vh;
        }

        .separator {
          border-right: 1px solid rgba(255, 255, 255, 0.1);
        }

        hr.simple {
          border: none;
          height: 1px;
          background-color: rgba(255, 255, 255, 0.1);
          width: 100%;
        }

        * {
          box-sizing: border-box;
        }

        @import url(//fonts.googleapis.com/css?family=Poppins);
      `}</style>
    </div>
  );
}
