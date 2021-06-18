import React from "react";
import Head from "next/head";
import styled from "styled-components";

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
import { MainEditingBody } from "components/core/editing/EditBody";
import { MediumHeading } from "components/common/Text/styled";
import { ExplorerFileSystem } from "components/core/fs/ExplorerFileSystem";
import { ExplorerHeadingContainer, FileExplorerHeading, FileExplorerSubHeading, ExplorerWorkspaceLabel } from "components/core/fs/ExplorerFileSystem/styled";


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
                onSelect={() => (i)}
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
          <ExplorerFileSystem filesystem={filesystem} />
        </FilesystemSection>
        <MainTabSection>
          <MainEditingBody fileEntity={filesystem}/>
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

        @import url(//fonts.googleapis.com/css?family=Poppins);
      `}</style>
    </div>
  );
}
