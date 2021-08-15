import styled from "styled-components";

export const StyledCompilerSection = styled.div`
  margin-top: 48px;

  & hr {
    border: none;
    margin: 25px 0;
    margin-left: -27px;
    width: calc(100% + 55px);
  }
`;

export const MiscOptionsContainer = styled.div`
  margin-top: 72px;
`;

export const StyledErrorLog = styled.div`
  background: rgba(255, 0, 0, 0.07);
  color: rgba(246, 136, 136, 1);
  padding: 11px 18px;
  margin-top: 12px;
  height: 100%;
  text-align: left;
  border-radius: 6px;
  border: 3px solid rgba(255, 0, 0, 0.08);

  & span {
    word-break: break-word;
  }
`;
