/* eslint-disable */
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import * as Long from "long";

export const protobufPackage = "";

export interface Session {
  /** time to live of session */
  ttl: number;
  /** base64 encoded UUID of session */
  session_id: string;
  /** unix timestamp on when session has been created */
  created_at: number;
  /** unix timestamp on when session has been updated */
  updated_at: number;
  /** unix timestamp on when session code has been compiled last time */
  compiled_at: number;
}

export interface CompilationInfo {
  version: string;
  compile_error: boolean;
  message: string;
}

export interface SessionLegacyNode {
  name: string;
  is_file: boolean;
  children: SessionLegacyNode[];
}

export interface SessionTree {
  file_paths: { [key: string]: string };
  files_order: string[];
}

export interface SessionTree_FilePathsEntry {
  key: string;
  value: string;
}

const baseSession: object = {
  ttl: 0,
  session_id: "",
  created_at: 0,
  updated_at: 0,
  compiled_at: 0,
};

export const Session = {
  encode(message: Session, writer: Writer = Writer.create()): Writer {
    if (message.ttl !== 0) {
      writer.uint32(8).uint64(message.ttl);
    }
    if (message.session_id !== "") {
      writer.uint32(18).string(message.session_id);
    }
    if (message.created_at !== 0) {
      writer.uint32(24).uint64(message.created_at);
    }
    if (message.updated_at !== 0) {
      writer.uint32(32).uint64(message.updated_at);
    }
    if (message.compiled_at !== 0) {
      writer.uint32(40).uint64(message.compiled_at);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Session {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSession } as Session;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ttl = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.session_id = reader.string();
          break;
        case 3:
          message.created_at = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.updated_at = longToNumber(reader.uint64() as Long);
          break;
        case 5:
          message.compiled_at = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Session {
    const message = { ...baseSession } as Session;
    if (object.ttl !== undefined && object.ttl !== null) {
      message.ttl = Number(object.ttl);
    } else {
      message.ttl = 0;
    }
    if (object.session_id !== undefined && object.session_id !== null) {
      message.session_id = String(object.session_id);
    } else {
      message.session_id = "";
    }
    if (object.created_at !== undefined && object.created_at !== null) {
      message.created_at = Number(object.created_at);
    } else {
      message.created_at = 0;
    }
    if (object.updated_at !== undefined && object.updated_at !== null) {
      message.updated_at = Number(object.updated_at);
    } else {
      message.updated_at = 0;
    }
    if (object.compiled_at !== undefined && object.compiled_at !== null) {
      message.compiled_at = Number(object.compiled_at);
    } else {
      message.compiled_at = 0;
    }
    return message;
  },

  toJSON(message: Session): unknown {
    const obj: any = {};
    message.ttl !== undefined && (obj.ttl = message.ttl);
    message.session_id !== undefined && (obj.session_id = message.session_id);
    message.created_at !== undefined && (obj.created_at = message.created_at);
    message.updated_at !== undefined && (obj.updated_at = message.updated_at);
    message.compiled_at !== undefined &&
      (obj.compiled_at = message.compiled_at);
    return obj;
  },

  fromPartial(object: DeepPartial<Session>): Session {
    const message = { ...baseSession } as Session;
    if (object.ttl !== undefined && object.ttl !== null) {
      message.ttl = object.ttl;
    } else {
      message.ttl = 0;
    }
    if (object.session_id !== undefined && object.session_id !== null) {
      message.session_id = object.session_id;
    } else {
      message.session_id = "";
    }
    if (object.created_at !== undefined && object.created_at !== null) {
      message.created_at = object.created_at;
    } else {
      message.created_at = 0;
    }
    if (object.updated_at !== undefined && object.updated_at !== null) {
      message.updated_at = object.updated_at;
    } else {
      message.updated_at = 0;
    }
    if (object.compiled_at !== undefined && object.compiled_at !== null) {
      message.compiled_at = object.compiled_at;
    } else {
      message.compiled_at = 0;
    }
    return message;
  },
};

const baseCompilationInfo: object = {
  version: "",
  compile_error: false,
  message: "",
};

export const CompilationInfo = {
  encode(message: CompilationInfo, writer: Writer = Writer.create()): Writer {
    if (message.version !== "") {
      writer.uint32(10).string(message.version);
    }
    if (message.compile_error === true) {
      writer.uint32(16).bool(message.compile_error);
    }
    if (message.message !== "") {
      writer.uint32(26).string(message.message);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): CompilationInfo {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCompilationInfo } as CompilationInfo;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.version = reader.string();
          break;
        case 2:
          message.compile_error = reader.bool();
          break;
        case 3:
          message.message = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CompilationInfo {
    const message = { ...baseCompilationInfo } as CompilationInfo;
    if (object.version !== undefined && object.version !== null) {
      message.version = String(object.version);
    } else {
      message.version = "";
    }
    if (object.compile_error !== undefined && object.compile_error !== null) {
      message.compile_error = Boolean(object.compile_error);
    } else {
      message.compile_error = false;
    }
    if (object.message !== undefined && object.message !== null) {
      message.message = String(object.message);
    } else {
      message.message = "";
    }
    return message;
  },

  toJSON(message: CompilationInfo): unknown {
    const obj: any = {};
    message.version !== undefined && (obj.version = message.version);
    message.compile_error !== undefined &&
      (obj.compile_error = message.compile_error);
    message.message !== undefined && (obj.message = message.message);
    return obj;
  },

  fromPartial(object: DeepPartial<CompilationInfo>): CompilationInfo {
    const message = { ...baseCompilationInfo } as CompilationInfo;
    if (object.version !== undefined && object.version !== null) {
      message.version = object.version;
    } else {
      message.version = "";
    }
    if (object.compile_error !== undefined && object.compile_error !== null) {
      message.compile_error = object.compile_error;
    } else {
      message.compile_error = false;
    }
    if (object.message !== undefined && object.message !== null) {
      message.message = object.message;
    } else {
      message.message = "";
    }
    return message;
  },
};

const baseSessionLegacyNode: object = { name: "", is_file: false };

export const SessionLegacyNode = {
  encode(message: SessionLegacyNode, writer: Writer = Writer.create()): Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.is_file === true) {
      writer.uint32(16).bool(message.is_file);
    }
    for (const v of message.children) {
      SessionLegacyNode.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SessionLegacyNode {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSessionLegacyNode } as SessionLegacyNode;
    message.children = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.is_file = reader.bool();
          break;
        case 3:
          message.children.push(
            SessionLegacyNode.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SessionLegacyNode {
    const message = { ...baseSessionLegacyNode } as SessionLegacyNode;
    message.children = [];
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.is_file !== undefined && object.is_file !== null) {
      message.is_file = Boolean(object.is_file);
    } else {
      message.is_file = false;
    }
    if (object.children !== undefined && object.children !== null) {
      for (const e of object.children) {
        message.children.push(SessionLegacyNode.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: SessionLegacyNode): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.is_file !== undefined && (obj.is_file = message.is_file);
    if (message.children) {
      obj.children = message.children.map((e) =>
        e ? SessionLegacyNode.toJSON(e) : undefined
      );
    } else {
      obj.children = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<SessionLegacyNode>): SessionLegacyNode {
    const message = { ...baseSessionLegacyNode } as SessionLegacyNode;
    message.children = [];
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.is_file !== undefined && object.is_file !== null) {
      message.is_file = object.is_file;
    } else {
      message.is_file = false;
    }
    if (object.children !== undefined && object.children !== null) {
      for (const e of object.children) {
        message.children.push(SessionLegacyNode.fromPartial(e));
      }
    }
    return message;
  },
};

const baseSessionTree: object = { files_order: "" };

export const SessionTree = {
  encode(message: SessionTree, writer: Writer = Writer.create()): Writer {
    Object.entries(message.file_paths).forEach(([key, value]) => {
      SessionTree_FilePathsEntry.encode(
        { key: key as any, value },
        writer.uint32(10).fork()
      ).ldelim();
    });
    for (const v of message.files_order) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SessionTree {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSessionTree } as SessionTree;
    message.file_paths = {};
    message.files_order = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          const entry1 = SessionTree_FilePathsEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry1.value !== undefined) {
            message.file_paths[entry1.key] = entry1.value;
          }
          break;
        case 2:
          message.files_order.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SessionTree {
    const message = { ...baseSessionTree } as SessionTree;
    message.file_paths = {};
    message.files_order = [];
    if (object.file_paths !== undefined && object.file_paths !== null) {
      Object.entries(object.file_paths).forEach(([key, value]) => {
        message.file_paths[key] = String(value);
      });
    }
    if (object.files_order !== undefined && object.files_order !== null) {
      for (const e of object.files_order) {
        message.files_order.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: SessionTree): unknown {
    const obj: any = {};
    obj.file_paths = {};
    if (message.file_paths) {
      Object.entries(message.file_paths).forEach(([k, v]) => {
        obj.file_paths[k] = v;
      });
    }
    if (message.files_order) {
      obj.files_order = message.files_order.map((e) => e);
    } else {
      obj.files_order = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<SessionTree>): SessionTree {
    const message = { ...baseSessionTree } as SessionTree;
    message.file_paths = {};
    message.files_order = [];
    if (object.file_paths !== undefined && object.file_paths !== null) {
      Object.entries(object.file_paths).forEach(([key, value]) => {
        if (value !== undefined) {
          message.file_paths[key] = String(value);
        }
      });
    }
    if (object.files_order !== undefined && object.files_order !== null) {
      for (const e of object.files_order) {
        message.files_order.push(e);
      }
    }
    return message;
  },
};

const baseSessionTree_FilePathsEntry: object = { key: "", value: "" };

export const SessionTree_FilePathsEntry = {
  encode(
    message: SessionTree_FilePathsEntry,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): SessionTree_FilePathsEntry {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseSessionTree_FilePathsEntry,
    } as SessionTree_FilePathsEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SessionTree_FilePathsEntry {
    const message = {
      ...baseSessionTree_FilePathsEntry,
    } as SessionTree_FilePathsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = String(object.value);
    } else {
      message.value = "";
    }
    return message;
  },

  toJSON(message: SessionTree_FilePathsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial(
    object: DeepPartial<SessionTree_FilePathsEntry>
  ): SessionTree_FilePathsEntry {
    const message = {
      ...baseSessionTree_FilePathsEntry,
    } as SessionTree_FilePathsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = "";
    }
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

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

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
