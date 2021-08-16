/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "";

export interface FileReprPair {
  path: string;
  file_data: string;
}

export interface FileSessionTree {
  paths: FileReprPair[];
}

const baseFileReprPair: object = { path: "", file_data: "" };

export const FileReprPair = {
  encode(
    message: FileReprPair,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.path !== "") {
      writer.uint32(10).string(message.path);
    }
    if (message.file_data !== "") {
      writer.uint32(18).string(message.file_data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FileReprPair {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseFileReprPair } as FileReprPair;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.path = reader.string();
          break;
        case 2:
          message.file_data = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FileReprPair {
    const message = { ...baseFileReprPair } as FileReprPair;
    if (object.path !== undefined && object.path !== null) {
      message.path = String(object.path);
    } else {
      message.path = "";
    }
    if (object.file_data !== undefined && object.file_data !== null) {
      message.file_data = String(object.file_data);
    } else {
      message.file_data = "";
    }
    return message;
  },

  toJSON(message: FileReprPair): unknown {
    const obj: any = {};
    message.path !== undefined && (obj.path = message.path);
    message.file_data !== undefined && (obj.file_data = message.file_data);
    return obj;
  },

  fromPartial(object: DeepPartial<FileReprPair>): FileReprPair {
    const message = { ...baseFileReprPair } as FileReprPair;
    if (object.path !== undefined && object.path !== null) {
      message.path = object.path;
    } else {
      message.path = "";
    }
    if (object.file_data !== undefined && object.file_data !== null) {
      message.file_data = object.file_data;
    } else {
      message.file_data = "";
    }
    return message;
  },
};

const baseFileSessionTree: object = {};

export const FileSessionTree = {
  encode(
    message: FileSessionTree,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.paths) {
      FileReprPair.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FileSessionTree {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseFileSessionTree } as FileSessionTree;
    message.paths = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.paths.push(FileReprPair.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FileSessionTree {
    const message = { ...baseFileSessionTree } as FileSessionTree;
    message.paths = [];
    if (object.paths !== undefined && object.paths !== null) {
      for (const e of object.paths) {
        message.paths.push(FileReprPair.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: FileSessionTree): unknown {
    const obj: any = {};
    if (message.paths) {
      obj.paths = message.paths.map((e) =>
        e ? FileReprPair.toJSON(e) : undefined
      );
    } else {
      obj.paths = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<FileSessionTree>): FileSessionTree {
    const message = { ...baseFileSessionTree } as FileSessionTree;
    message.paths = [];
    if (object.paths !== undefined && object.paths !== null) {
      for (const e of object.paths) {
        message.paths.push(FileReprPair.fromPartial(e));
      }
    }
    return message;
  },
};

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
