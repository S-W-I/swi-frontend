import styled from "styled-components";

const textStyle = `
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: left;
`;

export const StyledListContainer = styled.div`
  ${textStyle}

  display: flex;
  flex-direction: column;
  margin: 16px 0;
`;

const listStyle = `
  ${textStyle}

  width: 215px;
  height: 42px;

  border: none;
  border-radius: 4px;
  background: rgba(28, 23, 44, 1);
  color: white;

  padding: 4px;
  padding-left: 16px;
`;

export const StyledSelectList = styled.select`
  ${listStyle};
`;

export const StyledEmptyList = styled.div`
  ${listStyle};

  & span {
    display: block;
    margin-top: 4px;
  }

`;

export const StyledSelectLabel = styled.label`
  margin-bottom: 4px;
  font-weight: 300 !important;
  color: rgba(255, 255, 255, 0.4);
`;
