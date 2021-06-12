import Head from "next/head";
import styled from "styled-components";

import { HomeContainer, Footer, ApplicationColor } from "./styled";
import { IDEActionSection } from "components/core/ActionSection";

const RightSeparated = styled.div`
  border-right: 1px solid rgba(255, 255, 255, 0.1);
`;

const Heading = styled.h1`
  margin: 0;
  color: white;
`;

const MediumHeading = styled.h3`
  color: white;
`;

const SmallHeading = styled.h6`
  color: white;
`;

const Text = styled.span`
  color: white;
  font-size: 18px;
`;

enum FileSystemEntityKind {
  File,
  Directory,
}

// class Iterator<T> {

// }

type FileSystemEntityMeta = {
  icon?: string;
  name: string;
};

class FileSystemEntity {
  kind: FileSystemEntityKind;
  internal: FileSystemEntity[];
  meta: FileSystemEntityMeta;

  constructor(kind: FileSystemEntityKind, meta: FileSystemEntityMeta) {
    this.kind = kind;
    this.meta = meta;
    this.internal = [];
  }

  static new_file(meta: FileSystemEntityMeta): FileSystemEntity {
    return new FileSystemEntity(FileSystemEntityKind.File, meta);
  }

  static new_dir(meta: FileSystemEntityMeta): FileSystemEntity {
    return new FileSystemEntity(FileSystemEntityKind.Directory, meta);
  }

  is_file(): boolean {
    return this.kind === FileSystemEntityKind.File;
  }

  is_dir(): boolean {
    return !this.is_file();
  }

  push_file(file: FileSystemEntity) {
    if (!this.is_dir()) return;

    this.internal.push(file);
  }

  push_dir(dir: FileSystemEntity) {
    if (!this.is_dir()) return;

    this.internal.push(dir);
  }

  static dir_with_entities(meta: FileSystemEntityMeta, list: FileSystemEntity[]) {
    // if (!this.is_dir()) return null;
    const entity = FileSystemEntity.new_dir(meta);
    entity.internal = entity.internal.concat(list);
    return entity
  }
}

class FileSystemSnake {
  entitiesList: FileSystemEntity[];

  constructor(list: FileSystemEntity[]) {
    this.entitiesList = list;
  }
}

const MainEditingBody: React.FC<{}> = () => {
  const filesystem = new FileSystemSnake([
    FileSystemEntity.new_file({ name: "main.so" }),
    FileSystemEntity.dir_with_entities({ name: "some_stuff" }, [
      FileSystemEntity.new_file({ name: "sh.so" }),
    ]),
  ]);

  console.log({ filesystem })

  return null;
};

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomeContainer>
        {/* <IDEActionSection></IDEActionSection> */}

        <div style={{ width: 297, height: "100%" }} className="separator">
          <div
            style={{
              padding: "32px 28px",
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              alignItems: "center",
            }}
          >
            <img
              src="/app/selenium.svg"
              style={{ width: 140, paddingRight: 16 }}
            />
            <h3 style={{ color: "white" }}>Selenium</h3>
          </div>

          {/* <Separator /> */}
        </div>
        <div
          style={{ width: 268, height: "100%", padding: 16 }}
          className="separator"
        >
          1
        </div>
        <div style={{ padding: 16 }}>
          <Heading>Text Editor</Heading>
          <MainEditingBody />
        </div>
      </HomeContainer>
      <Footer />

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: Poppins, -apple-system, BlinkMacSystemFont, Segoe UI,
            Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
            Helvetica Neue, sans-serif;
          background-color: ${ApplicationColor.MAIN_BG};
        }

        .container {
          height: 100vh;
        }

        .separator {
          border-right: 1px solid rgba(255, 255, 255, 0.1);
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
