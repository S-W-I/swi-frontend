import React from "react";
import Head from "next/head";
import styled from "styled-components";

import { IDEActionSection } from "components/core/ActionSection";
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

const RightSeparated = styled.div`
  border-right: 1px solid rgba(255, 255, 255, 0.1);
`;

const Heading = styled.h1`
  margin: 0;
  color: white;
`;

const MediumHeading = styled.h3`
  color: white;
`;

const SmallHeading = styled.h6`
  color: white;
`;

const Text = styled.span`
  color: white;
  font-size: 18px;
`;

export const FileExplorerHeading = styled(Heading)`
  font-weight: 400;
  font-size: 22px;
  line-height: 33px;
`;
export const FileExplorerSubHeading = styled(FileExplorerHeading)`
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height */

  color: rgba(255, 255, 255, 0.4);
`;

export const ExplorerHeadingContainer = styled.div`
  padding: 54px 28px 28px 16px;
`;

export const ExplorerWorkspaceLabel = styled.h3`
  background: rgba(54, 79, 191, 0.1);
  padding: 12px 28px;
  height: 48px;
  margin: 0;

  color: rgba(54, 79, 191, 1);

  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
`;

const MainEditingBody: React.FC<{}> = () => {
  // const filesystem = new FileSystemSnake([
  //   FileSystemEntity.new_file({ name: "main.so" }),
  //   FileSystemEntity.dir_with_entities({ name: "some_stuff" }, [
  //     FileSystemEntity.new_file({ name: "sh.so" }),
  //   ]),
  // ]);

  // console.log({ filesystem });

  return null;
};

export type FSAbstractItemProps = {
  name: string;
  depthLevel: number; // zero-based
  imgPath: string;
};

export const FSAbstractItemContainer = styled.div`
  ${(props) => `
    & img {
      margin-left: ${10 * (props.depth ?? 0)}px;
    }
  `}

  & :not(:first-child) {
    margin-top: 12px;
  }

  & h3 {
    margin: 0;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    padding-left: 12px;
  }

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  padding: 6px 0;

  cursor: pointer;

  & :hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

export const FSAbstractItem: React.FC<
  FSAbstractItemProps & React.HTMLProps<{}>
> = (props) => {
  const { name, depthLevel, onClick, imgPath, ...restProps } = props;

  return (
    <FSAbstractItemContainer
      depth={depthLevel}
      onClick={onClick}
      {...restProps}
    >
      {/* <img src="/app/filesystem/dir.svg" /> */}
      <img src={imgPath} />
      <MediumHeading>{name}</MediumHeading>
      <div />
    </FSAbstractItemContainer>
  );
};

export const StyledExplorerFileSystem = styled.div`
  padding: 29.69px;
`;

export const ExplorerFileSystem: React.FC<{}> = (props) => {
  const filesystem = new FileSystemSnake([
    // FileSystemEntity.new_file({ name: "file.so" }),
    FileSystemEntity.dir_with_entities({ name: "src" }, [
      FileSystemEntity.new_file({ name: "lib.rs" }),
    ]).populateDepth(),
    FileSystemEntity.dir_with_entities({ name: "tests" }, [
      FileSystemEntity.new_file({ name: "lib.rs" }),
    ]).populateDepth(),
    FileSystemEntity.new_file({ name: "Cargo.lock" }),
    FileSystemEntity.new_file({ name: "Cargo.toml" }),
    FileSystemEntity.new_file({ name: "Xargo.toml" }),
  ])


  console.log({ filesystem });

  const onFSItemClick = (x: FileSystemEntity) => {
    console.log({
      name: x.meta.name,
      is_dir_opened: x.is_dir_opened,
      parent: x.parent,
    });
  };

  const retrieveImgIcon = (name: string): string => {
    let imgPath = "/app/filesystem/json.svg";
    if (name.indexOf(".") === -1) {
      return "/app/filesystem/dir.svg";
    } else {
      const extension = name.slice(name.lastIndexOf(".") + 1);

      switch (extension) {
        case "so":
          return "/app/filesystem/so.svg";
        case "txt":
          return "/app/filesystem/txt.svg";
        case "json":
          return "/app/filesystem/json.svg";
      }
    }
    return imgPath;
  };

  const items = filesystem.flatten();

  // let hidden_triggered = false
  const fsAbstractItems = items
    .map((x, i) => {
      const imgPath = retrieveImgIcon(x.meta.name);

      return (
        <FSAbstractItem
          key={i + x.depth + x.meta.name + x.is_dir_opened}
          name={x.meta.name}
          imgPath={imgPath}
          depthLevel={x.depth}
          onClick={() => onFSItemClick(x)}
        />
      );
    });

  return (
    <StyledExplorerFileSystem>
      {/* <FSAbstractItem name="Contracts" depthLevel={0}/>
      <FSAbstractItem name="Artifacts" depthLevel={1}/>
      <FSAbstractItem name="metadata.json" depthLevel={2}/> */}
      {fsAbstractItems}
    </StyledExplorerFileSystem>
  );
};

export default function Home() {
  const [currentSection, setCurrentSection] = React.useState(0);

  type Section = { text: string };
  const ideSectionList: Section[] = [
    {
      text: "File Explorers",
    },
    {
      text: "Compiler",
    },
    {
      text: "Transactions",
    },
  ];

  return (
    <div className="container">
      <Head>
        <title>Selenium | Develop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomeContainer>
        {/* <IDEActionSection></IDEActionSection> */}

        <ViewSelectSection className="separator">
          <LogoContainer>
            <img src="/app/selenium.svg" />
            <MediumHeading>Selenium</MediumHeading>
          </LogoContainer>

          <IDEActionsFlex>
            {ideSectionList.map((x, i) => (
              <IDEActionSection
                key={x.text}
                checked={i === currentSection}
                onSelect={() => setCurrentSection(i)}
              >
                {x.text}
              </IDEActionSection>
            ))}
          </IDEActionsFlex>
        </ViewSelectSection>

        <FilesystemSection className="separator">
          <ExplorerHeadingContainer>
            <FileExplorerHeading>File Explorers</FileExplorerHeading>
            <FileExplorerSubHeading>Workspaces</FileExplorerSubHeading>
          </ExplorerHeadingContainer>
          <ExplorerWorkspaceLabel>default_workspace</ExplorerWorkspaceLabel>
          <ExplorerFileSystem />
        </FilesystemSection>
        <MainTabSection>
          <Heading>Text Editor</Heading>
          <MainEditingBody />
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

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
