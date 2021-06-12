import React from 'react'

import { IDEStyledActionButton } from './styled'

export enum ButtonState {
  None = 0,
  Selected
}

export type ActionButtonProps = {}

export const IDEActionButton: React.FC<ActionButtonProps> = (props) => {


  return (
    <IDEStyledActionButton>

    </IDEStyledActionButton>
  )
}


export type ActionSectionProps = {}

export const IDEActionSection:  React.FC<ActionSectionProps> = (props) => {

  return null
}