import styled from "styled-components";


export class ApplicationColor {

  static MAIN_BG = 'rgba(18, 20, 28, 1)';


}

export const HomeContainer = styled.div`
  background-color: ${ApplicationColor.MAIN_BG};
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  height: 100%;
`;


export const Footer = styled.footer`

`