import { isNil } from "lodash";

import { Checkbox } from "components/common/Checkbox";
import { SelectList } from "components/common/SelectList";
import { Button } from "components/common/Button";

import React from "react";

import { StyledCompilerSection, MiscOptionsContainer } from "./styled";
import { FileSystemEntity } from "parser/file";

export type CompilerProps = {
  currentFile: FileSystemEntity | null;
};

export const CompilerSection: React.FC<CompilerProps> = (props) => {
  const [nightlyEnabled, triggerNightly] = React.useState(false);

  const buttonText = "Compile";
  const onDownload = () => {};
  // const buttonText = isNil(props.currentFile) ? 'Compile {"<no file selected>"}' : (
  //   isNil(props.currentFile.extension) ? "Cannot compile" :
  //   // `Compile ${props.currentFile}`
  // )

  return (
    <StyledCompilerSection>
      <SelectList
        labelProps={{ value: "Compiler" }}
        values={[
          { name: "0.8.1", value: "0.8.1" },
          { name: "0.8.5", value: "0.8.5" },
        ]}
      />
      <Checkbox
        label="Include nightly builds"
        checked={nightlyEnabled}
        onCheck={triggerNightly}
      />
      <SelectList
        labelProps={{ value: "Language" }}
        values={[{ name: "solana", value: "Solana" }]}
      />
      <SelectList
        labelProps={{ value: "BPF Version" }}
        values={[{ name: "bpf", value: "BPF Loader 3" }]}
      />
      <MiscOptionsContainer>
        <Checkbox
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
        />
      </MiscOptionsContainer>
      <hr className="simple" />
      <Button onClick={onDownload}>{buttonText}</Button>
    </StyledCompilerSection>
  );
};
