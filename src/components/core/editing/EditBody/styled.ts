import styled from "styled-components";

export const MainEditingBodyContainer = styled.div`
  height: calc(100% - 80px - ${(props) => props.consoleHeight}px);
`;

export const MainEditingBodyTopBar = styled.div`
  background-color: rgb(9, 11, 38);
  height: 40px;
  width: 100%;

  color: white;
  font-family: Courier;
  line-height: 24px;
  padding-top: 6px;
  padding-left: 12px;
  // padding-left: 64px;
`;

export const MainEditingBodyFile = styled.div`
  background-color: rgb(17, 19, 46);
  height: 100%;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  position: relative;
`;

export const StyledMainEditingBodyLineCounter = styled.div`
  background-color: rgb(41, 43, 67);
  width: 54px;
  height: 100%;

  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;

  line-height: 24px;

  & div {
    color: rgba(255, 255, 255, 0.6);
    text-align: center;
    font-family: Courier;
    font-style: normal;
    font-weight: normal;
  }
`;

export const MainEditingBodyCodeInput = styled.textarea`
  background-color: rgb(17, 19, 46);
  border: none;

  &:focus {
    outline: none;
  }

  color: white;

  font-family: Courier;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;

  padding-top: 0;
  padding-left: 16px;

  line-height: 24px;

  width: 100%;
`;

export const CurrentLineIndicator = styled.div`
  position: absolute;
  width: 100%;
  height: 22px;
  background: rgba(255, 0, 255, 0.5);

  ${(props) => `
    top: ${24 * props.lineNumber}px;
  `}
`;

export const StyledMainTextArea = styled.div`
  // background: red;
  overflow: scroll;
  font-family: monospace;
  line-height: 19px;
  width: 100%;
`;

export const StyledMainTextAreaLine = styled.div`
  // background: green;
`;

export const StyledMainTextAreaWord = styled.span`
  // background: green;
  color: ${(props) => props.color};
  // margin-right: 8px;
  margin-right: ${(props) => (!props.indistinct ? "8px" : "")};
`;
