import styled from "styled-components";

export const StyledCheckbox = styled.div`
  margin-right: 10px;
  height: 16px;
  width: 16px;

  border-radius: 3px;
  border: 1px solid rgba(82, 84, 104, 1);
  background-color: rgb(33, 34, 42);

  & img {
    margin-top: 3px;
    display: block;
    margin-left: 1px;
  }
`;

export const StyledCheckboxContainer = styled.div`
  margin-top: 8px;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  cursor: pointer;
`;
export const StyledCheckboxLabel = styled.label`
  font-family: Poppins;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0px;
  text-align: left;

  color: rgba(82, 84, 104, 1);
  cursor: pointer;
`;
