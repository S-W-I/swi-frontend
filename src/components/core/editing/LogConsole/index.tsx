import React from "react";

import {
  StyledMainLogConsole,
  StyledSearchBar,
  StyledLogWindow,
} from "./styled";

export const MainLogConsole: React.FC<{}> = (props) => {
  const mockBody = `
    The following libraries are sccesseble:
    web verson 1.1.0
    ethers.1s
    swarngv
    remox (ram.remix.help(] for more info)
  `.split("\n").map(x => <div>{x}</div>)

  return (
    <StyledMainLogConsole>
      <StyledSearchBar />
      <StyledLogWindow>
        {Array(10).fill(mockBody)}
      </StyledLogWindow>
    </StyledMainLogConsole>
  );
};
