import styled from "styled-components";
import { Heading } from "components/common/Text/styled";

export const StyledExplorerFileSystem = styled.div`
  padding: 29.69px;
  overflow: auto;
  height: calc(100vh - 187px);
`;

export const FSAbstractItemContainer = styled.div`
  ${(props) => `
    & img {
      margin-left: ${10 * (props.depth ?? 0)}px;
    }
  `}

  & :not(:first-child) {
    margin-top: 12px;
  }

  & h3 {
    margin: 0;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    padding-left: 12px;
  }

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  padding: 6px 0;

  cursor: pointer;

  & :hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

export const FileExplorerHeading = styled(Heading)`
  font-weight: 400;
  font-size: 22px;
  line-height: 33px;
`;
export const FileExplorerSubHeading = styled(FileExplorerHeading)`
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height */

  color: rgba(255, 255, 255, 0.4);
`;

export const ExplorerHeadingContainer = styled.div`
  padding: 54px 28px 28px 16px;
`;

export const ExplorerWorkspaceLabel = styled.h3`
  background: rgba(54, 79, 191, 0.1);
  padding: 12px 28px;
  height: 48px;
  margin: 0;

  color: rgba(54, 79, 191, 1);

  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
`;

