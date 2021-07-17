import { FileSystemSnake } from "parser/file";
import React from "react";
import { flatten } from "lodash";
import { MainLogConsole } from "../LogConsole";
import {
  StyledMainEditingBodyLineCounter,
  MainEditingBodyContainer,
  MainEditingBodyTopBar,
  MainEditingBodyFile,
  MainEditingBodyCodeInput,
  StyledMainTextArea,
  StyledMainTextAreaLine,
  StyledMainTextAreaWord,
} from "./styled";

class EditViewColors {
  static Class = "violet";
  static DeclarationKeyword = "rgb(55, 190, 181)";
  static FnName = "rgb(17, 166, 193)";
  static Variable = "rgb(159, 41, 70)";
  static Commented = "gray";
}

const MainTextArea: React.FC<{ code: string }> = (props) => {
  if (!props.code) {
    return <div />;
  }

  const splittedCode = props.code.split("\n");
  const html = splittedCode.map((line) => {
    if (line.slice(0, 2) === "//") {
      return (
        <StyledMainTextAreaLine>
          <StyledMainTextAreaWord color={EditViewColors.Commented}>
            {line}
          </StyledMainTextAreaWord>
        </StyledMainTextAreaLine>
      );
    }
    const lineByWords = line.split(" ").map((word, i, words) => {
      let color = "white";
      const [prev, next] = [words[i - 1], words[i + 1]];

      if (["impl", "pub"].includes(word)) {
        color = EditViewColors.Variable;
      }
      if (["use", "crate"].includes(word)) {
        color = EditViewColors.DeclarationKeyword;
      }

      if (["("].includes(word)) {
        color = EditViewColors.DeclarationKeyword;
      }
      // '::ProgramError' pattern
      if (word.includes("::")) {
        // color = EditViewColors.Class
        // const path = word.split("::");
        // return (
        //   path.map((pX, pI, pA) => {
        //     if (pA.length - 1 === pI) {
        //       return [
        //         <StyledMainTextAreaWord color={"white"}>
        //           ::
        //         </StyledMainTextAreaWord>,
        //         <StyledMainTextAreaWord color={EditViewColors.Class}>
        //           {pX}
        //         </StyledMainTextAreaWord>,
        //       ];
        //     }
        //     <StyledMainTextAreaWord color={"white"}>
        //       {pX}
        //     </StyledMainTextAreaWord>;
        //   })
        // );
      }

      return (
        <StyledMainTextAreaWord color={color}>{word}</StyledMainTextAreaWord>
      );
      // switch (word) {
      //   case :
      //   default:
      //     return { __html: `<span class="unstyled">${word}</span>` }
      // }
      // return { __html: `<span>${word}</span>` }
    });
    const mappedLine = flatten(lineByWords);

    return <StyledMainTextAreaLine>{mappedLine}</StyledMainTextAreaLine>;
  });

  return <StyledMainTextArea style={{}}>{html}</StyledMainTextArea>;
};

const MainEditingBodyLineCounter: React.FC<{ numberOfLines: number }> = (
  props
) => {
  return (
    <StyledMainEditingBodyLineCounter>
      {Array(props.numberOfLines)
        .fill(null)
        .map((x, i) => (
          <div>{i + 1}</div>
        ))}
    </StyledMainEditingBodyLineCounter>
  );
};

export type EditingBodyProps = {
  sourceCode: string;
  filename: string;
  onSourceCodeChange: (string) => void;
};

// const TEMPORARY_VIEWED_FILES_COUNT = 3

const CONSOLE_HEIGHT = 247;

export const MainEditingBody: React.FC<EditingBodyProps> = (props) => {
  const sourceCode = props.sourceCode || "";
  console.log({ sourceCode });
  const numberOfLines = !sourceCode ? 0 : sourceCode.split(/\r\n|\r|\n/).length;
  console.log({ numberOfLines, sourceCode });

  return (
    <MainEditingBodyContainer consoleHeight={CONSOLE_HEIGHT}>
      <MainEditingBodyTopBar>{props.filename}</MainEditingBodyTopBar>
      <MainEditingBodyFile>
        {/* <MainEditingBodyCodeInput
          value={sourceCode}
          onChange={(x) => {
            console.log({ x, val: x.target.value });
            props.onSourceCodeChange(x.target.value);
          }}
        /> */}
        <MainTextArea
          code={sourceCode}
          // onChange={(x) => {
          //   console.log({ x, val: x.target.value });
          //   props.onSourceCodeChange(x.target.value);
          // }}
        />
      </MainEditingBodyFile>
      <MainLogConsole consoleHeight={CONSOLE_HEIGHT} />
    </MainEditingBodyContainer>
  );
};
