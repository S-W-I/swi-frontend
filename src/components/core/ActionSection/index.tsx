import React from "react";

import { IDEStyledActionButton } from "./styled";

export enum ButtonState {
  None = 0,
  Selected,
}

export type ActionButtonProps = React.ButtonHTMLAttributes<{}>;

export const IDEActionButton: React.FC<ActionButtonProps> = (props) => {
  return (
    <IDEStyledActionButton {...props}>{props.children}</IDEStyledActionButton>
  );
};

export type ActionSectionProps = {
  checked?: boolean;
  onSelect: () => void;
};

export const IDEActionSection: React.FC<ActionSectionProps> = (props) => {
  const { children, onSelect, ...restProps } = props;

  return (
    <IDEActionButton {...restProps} onClick={onSelect}>
      {children}
    </IDEActionButton>
  );
};
