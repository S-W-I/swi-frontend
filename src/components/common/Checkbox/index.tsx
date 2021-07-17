import React from "react";

import {
  StyledCheckbox,
  StyledCheckboxContainer,
  StyledCheckboxLabel,
} from "./styled";

export const Checkbox: React.FC<{
  checked: boolean;
  onCheck: (newValue: boolean) => void;
  name?: string;
  value?: string;
  label: string;
}> = (props) => {
  const { checked, label } = props;

  return (
    <StyledCheckboxContainer onClick={() => props.onCheck(!checked)}>
      {/* <StyledCheckbox checked={checked}/> */}
      <StyledCheckbox checked={checked}>
        {checked && <img src="/app/common/mark.svg" />}
      </StyledCheckbox>
      {label && <StyledCheckboxLabel>{label}</StyledCheckboxLabel>}
    </StyledCheckboxContainer>
  );
};
