import React from "react";
import Head from "next/head";
import { Keypair } from "@solana/web3.js";
import jwt from "jsonwebtoken";
import base58 from "bs58";

import { isNil } from "lodash";
// import styled from "styled-components";

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
import { IDEBackendService, IDEFileEntity } from "services/fs";
import { LocalStorageManager, useLocalStorage } from "hooks/localStorage";

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

function useKeypair() {
  const [lsValue, setLsValue] = useLocalStorage(
    LocalStorageManager.PK_KEY,
    null
  );

  React.useEffect(() => {
    if (lsValue === null) {
      const kp = new Keypair();

      const encodedPrivateKey = base58.encode(kp.secretKey);
      const data = jwt.sign("some shit", encodedPrivateKey);

      console.log({ kp, encodedPrivateKey, data });

      setLsValue(encodedPrivateKey);
      console.log({ lsValueCreated: lsValue })
    } else {
      console.log({ lsValueMemorized: lsValue });
    }
  }, [lsValue]);
}

export default function Home() {
  const [currentSection, setCurrentSection] = React.useState(
    // SectionType.FileExplorers
    SectionType.Compiler
  );
  const [currentSelectedFile, setCurrentSelectedFile] =
    // React.useState<FileSystemEntity | null>(null);
    React.useState<FileSystemEntity | null>(
      FileSystemEntity.dir_with_entities({ name: "src" }, [
        FileSystemEntity.new_file({ name: "lib.rs" }),
      ]).populateDepth().internal[0]
    );

  console.log({ currentSelectedFile });

  const [sourceCodeState, setSourceCodeState] =
    React.useState<EditableFileSystem>({
      ["lib.rs"]: sourceCodeFixture.sc,
      ["Cargo.toml"]: "this is Cargo.toml",
      ["Xargo.toml"]: "this is Xargo.toml",
      ["Cargo.lock"]: "this is Cargo.lock",
    });

  const [filesystemStructure, setFileSystemStructure] =
    React.useState<FileSystemSnake | null>(null);

  const editableFileSystem: FileSystemState = {
    state: sourceCodeState,
    filesystem: filesystemStructure,
  };

  const ideService = new IDEBackendService({
    endpoint: "http://localhost:8081",
  });

  useKeypair();

  // const token = jwt.new

  React.useEffect(() => {
    (async () => {
      const filesystem = await ideService.fetchData();
      const result: FileSystemEntity[] = [];

      const populate = (
        inputFs: IDEFileEntity[] | null,
        levelCache: FileSystemEntity[]
      ) => {
        if (isNil(inputFs)) {
          return;
        }

        for (let i = 0; i < inputFs.length; i++) {
          const entity = inputFs[i];

          if (entity.IsFile) {
            levelCache.push(FileSystemEntity.new_file({ name: entity.Name }));
          } else {
            const thisCache = [];

            populate(entity.Children, thisCache);

            levelCache.push(
              FileSystemEntity.dir_with_entities(
                { name: entity.Name },
                thisCache
              ).populateDepth()
            );
          }
        }
      };
      populate(filesystem.Children, result);
      console.log(result);

      setFileSystemStructure(new FileSystemSnake(result));
    })();
  }, []);

  const currentEntityFilePath = currentSelectedFile?.currentEntityFilePath;
  console.log({ currentEntityFilePath });

  const editingBodyProps: EditingBodyProps = {
    sourceCode: sourceCodeState[currentEntityFilePath],
    // filename: currentSelectedFile?.meta.name,
    filename: currentSelectedFile?.currentEntityFilePath,
    onSourceCodeChange: (newCode) => {
      // sourceCodeState[currentSelectedFile] = newCode;
      const newState = Object.assign({}, sourceCodeState, {
        [currentEntityFilePath]: newCode,
      });
      console.log({ newState });

      setSourceCodeState(newState);
    },
  };
  console.log({ filesystem: editableFileSystem.filesystem, editingBodyProps });

  const compilerProps: CompilerProps = {
    currentFile: currentSelectedFile,
  };

  const sectionsMapping = {
    [SectionType.FileExplorers]: (
      <FilesystemSection className="separator">
        <ExplorerHeadingContainer>
          <FileExplorerHeading>File Explorers</FileExplorerHeading>
          <FileExplorerSubHeading>Workspaces</FileExplorerSubHeading>
        </ExplorerHeadingContainer>
        <ExplorerWorkspaceLabel>default_workspace</ExplorerWorkspaceLabel>
        <ExplorerFileSystem
          filesystem={editableFileSystem.filesystem}
          onSelectFile={(filename) => setCurrentSelectedFile(filename)}
        />
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
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomeContainer>
        {/* <IDEActionSection></IDEActionSection> */}

        <ViewSelectSection className="separator">
          <LogoContainer>
            <img src="/app/selenium.svg" />
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
