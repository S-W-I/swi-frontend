import styled from "styled-components";

// background-color: rgb(9, 11, 38);
// background-color: rgb(17, 19, 46);
export const StyledMainLogConsole = styled.div`
  height: ${(props) => props.consoleHeight}px;
  width: 100%;

  background-color: rgb(18, 20, 27);
`;

export const StyledSearchBar = styled.div`
  height: 40px;
  width: 100%;

  background-color: rgb(18, 20, 27);

  border: 1px solid rgba(255, 255, 255, 0.1);
  border-left: none;
  border-right: none;
`;

export const StyledLogWindow = styled.div`
  overflow: auto;
  height: 100%;
  padding-top: 30px;
  padding-left: 30px;
  padding-bottom: 30px;
  font-family: Courier;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: rgba(255, 255, 255, 0.6);
`;
