import styled from 'styled-components'
import { ButtonState } from './index'


class ButtonColor {
  static checked = "rgba(54, 79, 191, 1)";
  static unchecked = "rgba(89, 90, 96, 1)"
}

export const IDEStyledActionButton = styled.button`
  &:focus {
    outline: none;
  }

  width: 238px;
  height: 60px;

  font-size: 16px;
  font-weight: bold;
  border: none;

  cursor: pointer;

  ${props => props.checked ? `
    color: ${ButtonColor.checked};
    background: rgba(12, 14, 18, 1);
    border-radius: 12px;
    ` : `
    color: ${ButtonColor.unchecked};
    background: transparent;
  `}

`