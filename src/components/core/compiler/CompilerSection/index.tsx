import { Checkbox } from "components/common/Checkbox";
import { SelectList } from "components/common/SelectList";
import { Button } from "components/common/Button";

import React from "react";

import { StyledCompilerSection, MiscOptionsContainer } from "./styled";

export const CompilerSection: React.FC<{}> = (props) => {
  const [nightlyEnabled, triggerNightly] = React.useState(false);

  return (
    <StyledCompilerSection>
      <SelectList
        labelProps={{ value: "Compiler" }}
        values={[
          { name: "version", value: "0.8.1" },
          { name: "version", value: "0.8.5" },
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
      <Button>Compile {"<no file selected>"}</Button>
    </StyledCompilerSection>
  );
};
