import { MediumHeading } from "components/common/Text/styled";
import { FileSystemSnake, FileSystemEntity } from "parser/file";
import React from "react";
import { FSAbstractItemContainer, StyledExplorerFileSystem } from "./styled";

export type FSAbstractItemProps = {
  name: string;
  depthLevel: number; // zero-based
  imgPath: string;
};

export const FSAbstractItem: React.FC<
  FSAbstractItemProps & React.HTMLProps<{}>
> = (props) => {
  const { name, depthLevel, onClick, imgPath, ...restProps } = props;
  const dotIndex = name.indexOf(".");
  const extension = dotIndex === -1 ? null : name.slice(dotIndex + 1);
  console.log({ extension });
  return (
    <FSAbstractItemContainer
      depth={depthLevel}
      onClick={onClick}
      extension={extension}
      {...restProps}
    >
      {/* <img src="/app/filesystem/dir.svg" /> */}
      <img src={imgPath} />
      <MediumHeading>{name}</MediumHeading>
      <div />
      <div className="hoverable" />
    </FSAbstractItemContainer>
  );
};

type ExplorerFileSystemProps = {
  filesystem: FileSystemSnake;
  onSelectFile: (x: FileSystemEntity) => void;
  // onSelectFile: (string) => void;
};

export const ExplorerFileSystem: React.FC<ExplorerFileSystemProps> = (
  props
) => {
  const { filesystem } = props;

  console.log({ filesystem });

  const onFSItemClick = (x: FileSystemEntity) => {
    console.log({
      name: x.meta.name,
      is_dir_opened: x.is_dir_opened,
      parent: x.parent,
    });

    if (x.is_dir()) {
      return;
    }

    // props.onSelectFile(x, x.currentEntityFilePath);
    props.onSelectFile(x);
  };

  const retrieveImgIcon = (name: string): string => {
    let imgPath = "/app/filesystem/json.svg";
    if (name.indexOf(".") === -1) {
      return "/app/filesystem/dir.svg";
    } else {
      const extension = name.slice(name.lastIndexOf(".") + 1);

      switch (extension) {
        case "so":
          return "/app/filesystem/so.svg";
        case "txt":
          return "/app/filesystem/txt.svg";
        case "json":
          return "/app/filesystem/json.svg";
        case "rs":
          return "/app/filesystem/rs.svg";
        default:
          return "/app/filesystem/file.svg";
      }
    }
    return imgPath;
  };

  const items = filesystem.flatten();

  // let hidden_triggered = false
  const fsAbstractItems = items.map((x, i) => {
    const imgPath = retrieveImgIcon(x.meta.name);

    return (
      <FSAbstractItem
        key={i + x.depth + x.meta.name + x.is_dir_opened}
        name={x.meta.name}
        imgPath={imgPath}
        depthLevel={x.depth}
        onClick={() => onFSItemClick(x)}
      />
    );
  });

  return <StyledExplorerFileSystem>{fsAbstractItems}</StyledExplorerFileSystem>;
};
