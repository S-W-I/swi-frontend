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
import { ErrorLog } from "components/core/compiler/CompilerSection";
import { CompilationInfo } from "protobuf/session";

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

const MonacoEditorComponent: React.FC<{
  code: string;
  onChange: (string) => void;
}> = (props) => {
  const monaco = useMonaco();

  // fetch("src/themes/Monokai.json")
  //   .then((data) => data.json())
  //   .then((data) => {
  //     monaco.editor.defineTheme("tomorrow-night-blue", data);
  //     monaco.editor.setTheme("tomorrow-night-blue");
  //   });

  React.useEffect(() => {
    const definedTheme = require("themes/Tomorrow-Night-Blue-SWI.json");

    if (monaco && definedTheme) {
      monaco.editor.defineTheme("beardedtheme", definedTheme);
      monaco.editor.setTheme("beardedtheme");
    }
  }, [monaco]);

  return (
    <Editor
      defaultLanguage="rust"
      // defaultValue="// some comment"
      // theme="tomorrow-night-blue"
      theme="beardedtheme"
      value={props.code}
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
  compileInfo: CompilationInfo;
  onSourceCodeChange: (string) => void;
};


const CONSOLE_HEIGHT = 260;

export const MainEditingBody: React.FC<EditingBodyProps> = (props) => {
  const sourceCode = props.sourceCode || "";

  return (
    <MainEditingBodyContainer consoleHeight={CONSOLE_HEIGHT}>
      <MainEditingBodyTopBar>{props.filename}</MainEditingBodyTopBar>
      <MainEditingBodyFile>
        <MonacoEditorComponent
          code={sourceCode}
          onChange={(x) => {
            props.onSourceCodeChange(x);
          }}
        />
      </MainEditingBodyFile>
      <MainLogConsole consoleHeight={CONSOLE_HEIGHT}>
        <ErrorLog info={props.compileInfo} />
      </MainLogConsole>
    </MainEditingBodyContainer>
  );
};
