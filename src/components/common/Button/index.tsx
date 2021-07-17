import React from "react";

import { StyledButton } from "./styled";

export const Button: React.FC<React.ButtonHTMLAttributes<{}>> = (props) => {
  const { children, ...restProps } = props;
  return <StyledButton {...restProps}>{children}</StyledButton>;
};
