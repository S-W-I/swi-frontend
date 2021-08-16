import React from "react";

import { StyledButton, StyledAnchor } from "./styled";

export const Button: React.FC<React.ButtonHTMLAttributes<{}>> = (props) => {
  const { children, ...restProps } = props;
  return <StyledButton {...restProps}>{children}</StyledButton>;
};

export const AnchorButton: React.FC<React.AnchorHTMLAttributes<{}>> = (
  props
) => {
  const { children, ...restProps } = props;
  return <StyledAnchor {...restProps}>{children}</StyledAnchor>;
};
