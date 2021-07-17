import React from "react";

import {
  StyledSelectList,
  StyledSelectLabel,
  StyledListContainer,
  StyledEmptyList,
} from "./styled";

export type SelectListLabel = {
  value: string;
};

export type SelectItem = {
  name: string;
  value: string;
  selected?: boolean;
  disabled?: boolean;
};
export const SelectList: React.FC<{
  // name: string;
  values: SelectItem[];
  labelProps?: SelectListLabel;
}> = (props) => {
  const listValues = props.values.map(({ name, ...rest }) => (
    <option {...rest}>{name}</option>
  ));

  return (
    <StyledListContainer>
      {props.labelProps && (
        <StyledSelectLabel>{props.labelProps!.value}</StyledSelectLabel>
      )}
      {listValues.length === 1 ? (
        <StyledEmptyList>
          <span>{props.values[0]!.value}</span>
        </StyledEmptyList>
      ) : (
        <StyledSelectList>{listValues}</StyledSelectList>
      )}
    </StyledListContainer>
  );
};
