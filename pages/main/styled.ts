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


export const ViewSelectSection = styled.div`
  width: 297px;
  height: 100%;
`
export const FilesystemSection = styled.div`
  width: 268px;
  height: 100%;
`

export const MainTabSection = styled.div`
  width: calc(100vw - 565px);
  height: 100vh;
`

export const LogoContainer = styled.div`
  padding: 32px 28px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;

  & img {
    width: 140px;
    padding-right: 16px;
    margin-right: -33px;
  }
`

export const IDEActionsFlex = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  padding: 26px;

  & button {
    width: 100%;
  }

  & button:not(:first-child) {
    margin-top: 16px;
  }
`
