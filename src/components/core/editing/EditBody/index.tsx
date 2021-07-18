import React from "react";
import { flatten, invert } from "lodash";
// import MonacoEditor from "react-monaco-editor";
import Editor, { useMonaco } from "@monaco-editor/react";

import { MainLogConsole } from "../LogConsole";
import { FileSystemSnake } from "parser/file";
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
  static Default = "white";
  static Class = "violet";
  static DeclarationKeyword = "rgb(55, 190, 181)";
  static FnName = "rgb(17, 166, 193)";
  static Variable = "rgb(159, 41, 70)";
  static Commented = "gray";
  static Ref = "gold";
}

class EditorColors {
  static EditBody = "rgb(17, 19, 46)";
}

const beardedtheme = require("vscode-themes/bearded-theme-arc-eggplant.json");

const MonacoEditorComponent: React.FC<{
  code: string;
  onChange: (string) => void;
}> = (props) => {
  const monaco = useMonaco();

  React.useEffect(() => {
    if (monaco) {
      console.log({ monaco, beardedtheme });

      // monaco.editor.defineTheme('hc-black', Object.assign(beardedtheme, { base: "hc-black"}));
      // monaco.editor.defineTheme('monokai', JSON.stringify(beardedtheme));
      // monaco.editor.setTheme('beardedtheme');
      // monaco.editor.defineTheme("monokai", beardedtheme);

      // monaco.editor.defineTheme("myTheme", {
      //   base: "vs",
      //   inherit: true,
      //   rules: [{ background: "#11132e" }],
      //   colors: {
      //     "editor.foreground": "#000000",
      //     "editor.background": "#EDF9FA",
      //     "editorCursor.foreground": "#8B0000",
      //     "editor.lineHighlightBackground": "#0000FF20",
      //     "editorLineNumber.foreground": "#008800",
      //     "editor.selectionBackground": "#88000030",
      //     "editor.inactiveSelectionBackground": "#88000015",
      //   },
      // });
      // monaco.editor.setTheme("myTheme");
    }
  }, [monaco]);

  return (
    <Editor
      defaultLanguage="rust"
      theme={"vs-dark"}
      // defaultValue="// some comment"
      defaultValue={props.code}
      onChange={props.onChange}
    />
  );
};

// class CodeKeywords {
//   static readonly RegexToColorsMap: { [x: string]: string[] } = {
//     // ["/use|pub|crate/"]: EditViewColors.DeclarationKeyword,
//     [EditViewColors.DeclarationKeyword]: ["^(use|pub|crate)$", "^[A-z]!$"],
//   };
// }

// const isAlphabetCharacter = (charCode: number) => {
//   return (
//     (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)
//   );
// };

// const MainTextArea: React.FC<{ code: string }> = (props) => {
//   if (!props.code) {
//     return <div />;
//   }

//   const splittedCode = props.code.split("\n");
//   const html = splittedCode.map((line) => {
//     const mappedLine = line.split(" ").map((word) => {
//       const keywords = Object.keys(CodeKeywords.RegexToColorsMap);
//       // const colors = invert(CodeKeywords.RegexToColorsMap);
//       // console.log({ colors })
//       for (let i = 0; i < keywords.length; i++) {
//         const keywordKey = keywords[i];
//         const color = keywordKey;

//         // const [regexList, color] = colors[i];
//         const regexList = CodeKeywords.RegexToColorsMap[keywordKey];

//         for (let j = 0; j < regexList.length; j++) {
//           const regexp = new RegExp(regexList[j]);
//           console.log({ color });

//           if (regexp.exec(word)) {
//             return (
//               <StyledMainTextAreaWord color={color}>
//                 {word}
//               </StyledMainTextAreaWord>
//             );
//           }

//           continue;
//         }
//       }
//       return (
//         <StyledMainTextAreaWord color={EditViewColors.Default}>
//           {word}
//         </StyledMainTextAreaWord>
//       );
//     });
//     return <StyledMainTextAreaLine>{mappedLine}</StyledMainTextAreaLine>;
//   });

//   return <StyledMainTextArea>{html}</StyledMainTextArea>;
// };

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

const CONSOLE_HEIGHT = 197;

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
        {/* <MainTextArea
          code={sourceCode}
          // onChange={(x) => {
          //   console.log({ x, val: x.target.value });
          //   props.onSourceCodeChange(x.target.value);
          // }}
        /> */}
        <MonacoEditorComponent
          code={sourceCode}
          onChange={(x) => {
            console.log({ x, val: x.target.value });
            props.onSourceCodeChange(x.target.value);
          }}
        />
      </MainEditingBodyFile>
      <MainLogConsole consoleHeight={CONSOLE_HEIGHT} />
    </MainEditingBodyContainer>
  );
};
