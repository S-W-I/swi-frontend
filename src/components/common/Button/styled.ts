import styled from "styled-components";

const buttonStyles = `
  width: 215px;
  height: 42px;

  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: 21px;
  letter-spacing: 0px;
  text-align: left;

  border: none;
  background: rgba(54, 79, 191, 1);
  text-align: center;
  color: white;
  border-radius: 3px;

  cursor: pointer;
`;

export const StyledButton = styled.button`
  ${buttonStyles}
`;

export const StyledAnchor = styled.a`
  ${buttonStyles}

  display: block;

  text-decoration: none;
  text-align: center;
  padding: 11px;
`;
