import { isNil } from "lodash";

import { Checkbox } from "components/common/Checkbox";
import { SelectList } from "components/common/SelectList";
import { Button } from "components/common/Button";

import React from "react";

import {
  StyledCompilerSection,
  MiscOptionsContainer,
  StyledErrorLog,
} from "./styled";
import { FileSystemEntity } from "parser/file";

import { CompilationInfo } from "protobuf/session";

export type CompilerProps = {
  buttonName: string;
  currentFile: FileSystemEntity | null;
  compileInfo: CompilationInfo | null;
  onCompile: () => void;
  onDownload: () => void;
};

export const ErrorLog: React.FC<{ info: CompilationInfo }> = (props) => {
  if (!props.info?.compile_error) {
    return null;
  }

  return (
    <StyledErrorLog>
      <span>{props.info.message}</span>
    </StyledErrorLog>
  );
};

export const CompilerSection: React.FC<CompilerProps> = (props) => {
  return (
    <StyledCompilerSection>
      <SelectList
        labelProps={{ value: "Compiler" }}
        values={[
          { name: "1.6.9", value: "1.6.9" },
          // { name: "0.8.1", value: "0.8.1" },
          // { name: "0.8.5", value: "0.8.5" },
        ]}
      />
      {/* <Checkbox
        label="Include nightly builds"
        checked={nightlyEnabled}
        onCheck={triggerNightly}
      /> */}
      <SelectList
        labelProps={{ value: "Language" }}
        values={[{ name: "solana", value: "Solana" }]}
      />
      <SelectList
        labelProps={{ value: "BPF Version" }}
        values={[{ name: "bpf", value: "BPF Loader 3" }]}
      />
      <MiscOptionsContainer>
        {/* <Checkbox
          label="Auto compile"
          checked={nightlyEnabled}
          onCheck={triggerNightly}
        />
        <Checkbox
          label="Enable optimization"
          checked={nightlyEnabled}
          onCheck={triggerNightly}
        />
        <Checkbox
          label="Hide warnings"
          checked={nightlyEnabled}
          onCheck={triggerNightly}
        /> */}
      </MiscOptionsContainer>
      <Button onClick={props.onCompile}>Compile</Button>
      <hr className="simple" />

      {props.compileInfo?.compile_error ? (
        <ErrorLog info={props.compileInfo} />
      ) : (
        !isNil(props.compileInfo) && (
          <Button
            onClick={props.onDownload}
            style={{ background: "rgb(46,4,202)" }}
          >
            Download
          </Button>
        )
      )}
    </StyledCompilerSection>
  );
};
