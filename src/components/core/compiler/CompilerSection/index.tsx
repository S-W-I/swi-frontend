import React from "react";
import { isNil } from "lodash";
import Lottie from "lottie-react";

import { Checkbox } from "components/common/Checkbox";
import { SelectList } from "components/common/SelectList";
import { Button, AnchorButton } from "components/common/Button";

import { WrappedButton } from "./styled";

import loaderAnimation from "anims/loader/loader.json";

import {
  StyledCompilerSection,
  MiscOptionsContainer,
  StyledErrorLog,
} from "./styled";
import { FileSystemEntity } from "parser/file";

import { CompilationInfo } from "protobuf/session";

export type CompilerProps = {
  currentFile: FileSystemEntity | null;
  compileInfo: CompilationInfo | null;
  isProcessing: boolean;
  onCompile: () => void;
  // onDownload: () => void;
  downloadLink: string;
};

export const ErrorLog: React.FC<{ info: CompilationInfo }> = (props) => {
  if (!props.info?.compile_error) {
    return null;
  }

  const lines = props.info.message.split("\n").map((x) => <span>{x}</span>);

  return (
    <StyledErrorLog>
      {/* <span>{props.info.message}</span> */}
      {lines}
    </StyledErrorLog>
  );
};

export const CompilerSection: React.FC<CompilerProps> = (props) => {
  const { isProcessing } = props;
  // const isProcessing = false;

  return (
    <StyledCompilerSection>
      <SelectList
        labelProps={{ value: "Compiler" }}
        values={[{ name: "1.6.9", value: "1.6.9" }]}
      />
      <SelectList
        labelProps={{ value: "Language" }}
        values={[{ name: "solana", value: "Solana" }]}
      />
      <SelectList
        labelProps={{ value: "BPF Version" }}
        values={[{ name: "bpf", value: "BPF Loader 3" }]}
      />
      <MiscOptionsContainer></MiscOptionsContainer>
      <WrappedButton>
        {isProcessing ? (
          <>
            <Button disabled style={{ cursor: "not-allowed" }}></Button>
            <Lottie animationData={loaderAnimation} />
          </>
        ) : (
          <>
            <Button onClick={props.onCompile}>Compile</Button>
          </>
        )}
      </WrappedButton>
      <hr className="simple" />
      {props.compileInfo?.compile_error
        ? null
        : !isNil(props.compileInfo) && (
            <AnchorButton
              href={props.downloadLink}
              style={{ background: "rgb(46,4,202)" }}
              target="_blank"
            >
              Download
            </AnchorButton>
          )}
    </StyledCompilerSection>
  );
};
