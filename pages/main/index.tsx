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

export const MainEditingBodyContainer = styled.div`
  height: calc(100% - 40px - 197px);
`

export const MainEditingBodyTopBar = styled.div`
  background-color: rgb(9, 11, 38);
  height: 40px;
  width: 100%;

  color: white;
  font-family: Courier;
  line-height: 24px;
  padding-top: 6px;
  padding-left: 64px;
`

export const MainEditingBodyFile = styled.div`
  background-color: rgb(17, 19, 46);
  height: 100%;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  position: relative;
`

export const StyledMainEditingBodyLineCounter = styled.div`
  background-color: rgb(41, 43, 67);
  width: 54px;
  height: 100%;

  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;

  line-height: 24px;

  & div {
    color: rgba(255, 255, 255, 0.6);
    text-align: center;
    font-family: Courier;
    font-style: normal;
    font-weight: normal;
  }
`

const MainEditingBodyLineCounter: React.FC<{ numberOfLines: number }> = props => {

  return (
    <StyledMainEditingBodyLineCounter>
      {Array(props.numberOfLines).fill(null).map((x, i)=> <div>{i + 1}</div>)}
    </StyledMainEditingBodyLineCounter>
  )
}

export const MainEditingBodyCodeInput = styled.textarea`
  background-color: rgb(17, 19, 46);
  border: none;

  &:focus {
    outline: none;
  }

  color: white;


  font-family: Courier;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;

  padding-top: 0;
  padding-left: 16px;

  line-height: 24px;

  width: 100%;
`

export const CurrentLineIndicator = styled.div`
  position: absolute;
  width: 100%;
  height: 22px;
  background: rgba(255, 0, 255, 0.5);

  ${props => `
    top: ${24 * props.lineNumber}px;
  `}
`


const mockFile = `
use byteorder::{ByteOrder, LittleEndian};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
};
// use solana_sdk::system_instruction::SystemInstruction;
use std::mem;

// Declare and export the program's entrypoint
entrypoint!(process_instruction);

// Program entrypoint's implementation
pub fn process_instruction(
    program_id: &Pubkey, // Public key of the account the hello world program was loaded into
    accounts: &[AccountInfo], // The account to say hello to
    _instruction_data: &[u8], // Ignored, all helloworld instructions are hellos
) -> ProgramResult {
    msg!("Helloworld Rust program entrypoint");

    // Iterating accounts is safer then indexing
    let accounts_iter = &mut accounts.iter();

    // Get the account to say hello to
    let account = next_account_info(accounts_iter)?;

    // The account must be owned by the program in order to modify its data
    if account.owner != program_id {
        msg!("Greeted account does not have the correct program id");
        return Err(ProgramError::IncorrectProgramId);
    }

    // The data must be large enough to hold a u32 count
    if account.try_data_len()? < mem::size_of::<u32>() {
        msg!("Greeted account data length too small for u32");
        return Err(ProgramError::InvalidAccountData);
    }

    // Increment and store the number of times the account has been greeted
    let mut data = account.try_borrow_mut_data()?;
    let mut num_greets = LittleEndian::read_u32(&data);
    num_greets += 1;
    LittleEndian::write_u32(&mut data[0..], num_greets);

    msg!("Hello!");

    Ok(())
}

// Sanity tests
#[cfg(test)]
mod test {
    use super::*;
    use solana_program::clock::Epoch;

    #[test]
    fn test_sanity() {
        let program_id = Pubkey::default();
        let key = Pubkey::default();
        let mut lamports = 0;
        let mut data = vec![0; mem::size_of::<u32>()];
        LittleEndian::write_u32(&mut data, 0);

        let owner = Pubkey::default();
        let account = AccountInfo::new(
            &key,
            false,
            true,
            &mut lamports,
            &mut data,
            &owner,
            false,
            Epoch::default(),
        );
        let instruction_data: Vec<u8> = Vec::new();

        let accounts = vec![account];

        assert_eq!(LittleEndian::read_u32(&accounts[0].data.borrow()), 0);
        process_instruction(&program_id, &accounts, &instruction_data).unwrap();
        assert_eq!(LittleEndian::read_u32(&accounts[0].data.borrow()), 1);
        process_instruction(&program_id, &accounts, &instruction_data).unwrap();
        assert_eq!(LittleEndian::read_u32(&accounts[0].data.borrow()), 2);
    }
}
`

const MainEditingBody: React.FC<{ fileEntity: FileSystemSnake }> = (props) => {
  // const filesystem = new FileSystemSnake([
  //   FileSystemEntity.new_file({ name: "main.so" }),
  //   FileSystemEntity.dir_with_entities({ name: "some_stuff" }, [
  //     FileSystemEntity.new_file({ name: "sh.so" }),
  //   ]),
  // ]);

  // console.log({ filesystem });

  const [inputCode, setInputCode] = React.useState(mockFile)
  const numberOfLines = inputCode.split(/\r\n|\r|\n/).length
  console.log({ numberOfLines })

  return (
    <MainEditingBodyContainer>
      {/* <MainEditingBodyTopBar>{props.fileEntity.flatten()[0].meta.name}</MainEditingBodyTopBar> */}
      <MainEditingBodyTopBar>lib.rs</MainEditingBodyTopBar>
      <MainEditingBodyFile>
        {/* <MainEditingBodyLineCounter numberOfLines={numberOfLines}/> */}
        <MainEditingBodyCodeInput value={inputCode} initialValue={mockFile} onChange={x => {
          // console.log({ x: x.target.value })
          setInputCode(x.target.value)
        }}/>
        {/* <CurrentLineIndicator lineNumber={numberOfLines - 1}/> */}
      </MainEditingBodyFile>
      <MainLogConsole />
    </MainEditingBodyContainer>
  );
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
  overflow: auto;
  height: calc(100vh - 187px);
`;

export const ExplorerFileSystem: React.FC<{ filesystem: FileSystemSnake }> = (props) => {
  const { filesystem } = props

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
      `}</style>
    </div>
  );
}
