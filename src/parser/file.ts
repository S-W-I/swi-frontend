export enum FileSystemEntityKind {
  File,
  Directory,
}

// class Iterator<T> {

// }

export type FileSystemEntityMeta = {
  icon?: string;
  name: string;
};

export class FileSystemEntity {
  kind: FileSystemEntityKind;
  internal: FileSystemEntity[];
  meta: FileSystemEntityMeta;
  depth: number;
  parent: null | FileSystemEntity;

  is_dir_opened: boolean;

  constructor(kind: FileSystemEntityKind, meta: FileSystemEntityMeta) {
    this.kind = kind;
    this.meta = meta;
    this.internal = [];

    this.parent = null;
    this.depth = 0;

    this.is_dir_opened = true;
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

  open_dir() {
    if (!this.is_dir()) return;
    this.is_dir_opened = true;
  }

  close_dir() {
    if (!this.is_dir()) return;
    this.is_dir_opened = false;
  }

  push_file(file: FileSystemEntity) {
    if (!this.is_dir()) return;

    this.internal.push(file);
  }

  push_dir(dir: FileSystemEntity) {
    if (!this.is_dir()) return;

    this.internal.push(dir);
  }

  static dir_with_entities(
    meta: FileSystemEntityMeta,
    list: FileSystemEntity[]
  ) {
    // if (!this.is_dir()) return null;
    const entity = FileSystemEntity.new_dir(meta);
    entity.internal = entity.internal.concat(list);
    return entity;
  }

  populateDepth() {
    const populate = (
      depth: number,
      parent: FileSystemEntity,
      internal: FileSystemEntity[]
    ) => {
      if (internal.length === 0) return;

      for (let i = 0; i < internal.length; i++) {
        const entity = internal[i];

        if (entity.is_dir()) {
          entity.is_dir_opened = true;
        }

        entity.depth = depth;
        entity.parent = parent;
        populate(depth + 1, entity, entity.internal);
      }
    };

    populate(this.depth + 1, this, this.internal);

    return this;
  }

  get currentEntityFilePath(): string {
    let path = "";
    let node: FileSystemEntity | null = this;

    while (node !== null) {
      const name = node.meta.name;

      if (path === "") {
        path = name;
      } else {
        path = name + "/" + path;
      }

      node = node.parent;
    }

    return path;
  }

  get extension(): string | null {
    if (this.is_dir()) {
      return null;
    }

    const spl = this.meta.name.split(".");
    return spl[spl.length - 1];
  }
}

export class FileSystemSnake {
  entitiesList: FileSystemEntity[];

  constructor(list: FileSystemEntity[]) {
    this.entitiesList = list;
  }

  flatten(): FileSystemEntity[] {
    const res = [];

    const iterate = (startList: FileSystemEntity[]) => {
      if (startList.length === 0) return;

      for (const item of startList) {
        res.push(item);

        iterate(item.internal);
      }
    };
    iterate(this.entitiesList);

    return res;
  }
}
