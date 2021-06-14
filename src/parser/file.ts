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

  static dir_with_entities(
    meta: FileSystemEntityMeta,
    list: FileSystemEntity[]
  ) {
    // if (!this.is_dir()) return null;
    const entity = FileSystemEntity.new_dir(meta);
    entity.internal = entity.internal.concat(list);
    return entity;
  }
}

class FileSystemSnake {
  entitiesList: FileSystemEntity[];

  constructor(list: FileSystemEntity[]) {
    this.entitiesList = list;
  }
}