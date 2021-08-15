/* eslint-disable */
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import * as Long from "long";
import { Any } from "../google/protobuf/any";

export const protobufPackage = "";

export interface Response {
  message: string;
  result: Any | undefined;
}

export interface DropResponseMessage {
  message: string;
}

export interface RequestSessionBody {
  session_id: string;
}

export interface UpdateSessionBody {
  session_id: string;
  tree: { [key: string]: string };
}

export interface UpdateSessionBody_TreeEntry {
  key: string;
  value: string;
}

export interface CompileSessionBody {
  session_id: string;
}

export interface DownloadCompiledSessionBody {
  session_id: string;
}

const baseResponse: object = { message: "" };

export const Response = {
  encode(message: Response, writer: Writer = Writer.create()): Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    if (message.result !== undefined) {
      Any.encode(message.result, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Response {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseResponse } as Response;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.message = reader.string();
          break;
        case 2:
          message.result = Any.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Response {
    const message = { ...baseResponse } as Response;
    if (object.message !== undefined && object.message !== null) {
      message.message = String(object.message);
    } else {
      message.message = "";
    }
    if (object.result !== undefined && object.result !== null) {
      message.result = Any.fromJSON(object.result);
    } else {
      message.result = undefined;
    }
    return message;
  },

  toJSON(message: Response): unknown {
    const obj: any = {};
    message.message !== undefined && (obj.message = message.message);
    message.result !== undefined &&
      (obj.result = message.result ? Any.toJSON(message.result) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<Response>): Response {
    const message = { ...baseResponse } as Response;
    if (object.message !== undefined && object.message !== null) {
      message.message = object.message;
    } else {
      message.message = "";
    }
    if (object.result !== undefined && object.result !== null) {
      message.result = Any.fromPartial(object.result);
    } else {
      message.result = undefined;
    }
    return message;
  },
};

const baseDropResponseMessage: object = { message: "" };

export const DropResponseMessage = {
  encode(
    message: DropResponseMessage,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): DropResponseMessage {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDropResponseMessage } as DropResponseMessage;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.message = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DropResponseMessage {
    const message = { ...baseDropResponseMessage } as DropResponseMessage;
    if (object.message !== undefined && object.message !== null) {
      message.message = String(object.message);
    } else {
      message.message = "";
    }
    return message;
  },

  toJSON(message: DropResponseMessage): unknown {
    const obj: any = {};
    message.message !== undefined && (obj.message = message.message);
    return obj;
  },

  fromPartial(object: DeepPartial<DropResponseMessage>): DropResponseMessage {
    const message = { ...baseDropResponseMessage } as DropResponseMessage;
    if (object.message !== undefined && object.message !== null) {
      message.message = object.message;
    } else {
      message.message = "";
    }
    return message;
  },
};

const baseRequestSessionBody: object = { session_id: "" };

export const RequestSessionBody = {
  encode(
    message: RequestSessionBody,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.session_id !== "") {
      writer.uint32(10).string(message.session_id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): RequestSessionBody {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRequestSessionBody } as RequestSessionBody;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.session_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RequestSessionBody {
    const message = { ...baseRequestSessionBody } as RequestSessionBody;
    if (object.session_id !== undefined && object.session_id !== null) {
      message.session_id = String(object.session_id);
    } else {
      message.session_id = "";
    }
    return message;
  },

  toJSON(message: RequestSessionBody): unknown {
    const obj: any = {};
    message.session_id !== undefined && (obj.session_id = message.session_id);
    return obj;
  },

  fromPartial(object: DeepPartial<RequestSessionBody>): RequestSessionBody {
    const message = { ...baseRequestSessionBody } as RequestSessionBody;
    if (object.session_id !== undefined && object.session_id !== null) {
      message.session_id = object.session_id;
    } else {
      message.session_id = "";
    }
    return message;
  },
};

const baseUpdateSessionBody: object = { session_id: "" };

export const UpdateSessionBody = {
  encode(message: UpdateSessionBody, writer: Writer = Writer.create()): Writer {
    if (message.session_id !== "") {
      writer.uint32(10).string(message.session_id);
    }
    Object.entries(message.tree).forEach(([key, value]) => {
      UpdateSessionBody_TreeEntry.encode(
        { key: key as any, value },
        writer.uint32(18).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): UpdateSessionBody {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUpdateSessionBody } as UpdateSessionBody;
    message.tree = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.session_id = reader.string();
          break;
        case 2:
          const entry2 = UpdateSessionBody_TreeEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry2.value !== undefined) {
            message.tree[entry2.key] = entry2.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateSessionBody {
    const message = { ...baseUpdateSessionBody } as UpdateSessionBody;
    message.tree = {};
    if (object.session_id !== undefined && object.session_id !== null) {
      message.session_id = String(object.session_id);
    } else {
      message.session_id = "";
    }
    if (object.tree !== undefined && object.tree !== null) {
      Object.entries(object.tree).forEach(([key, value]) => {
        message.tree[key] = String(value);
      });
    }
    return message;
  },

  toJSON(message: UpdateSessionBody): unknown {
    const obj: any = {};
    message.session_id !== undefined && (obj.session_id = message.session_id);
    obj.tree = {};
    if (message.tree) {
      Object.entries(message.tree).forEach(([k, v]) => {
        obj.tree[k] = v;
      });
    }
    return obj;
  },

  fromPartial(object: DeepPartial<UpdateSessionBody>): UpdateSessionBody {
    const message = { ...baseUpdateSessionBody } as UpdateSessionBody;
    message.tree = {};
    if (object.session_id !== undefined && object.session_id !== null) {
      message.session_id = object.session_id;
    } else {
      message.session_id = "";
    }
    if (object.tree !== undefined && object.tree !== null) {
      Object.entries(object.tree).forEach(([key, value]) => {
        if (value !== undefined) {
          message.tree[key] = String(value);
        }
      });
    }
    return message;
  },
};

const baseUpdateSessionBody_TreeEntry: object = { key: "", value: "" };

export const UpdateSessionBody_TreeEntry = {
  encode(
    message: UpdateSessionBody_TreeEntry,
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
  ): UpdateSessionBody_TreeEntry {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseUpdateSessionBody_TreeEntry,
    } as UpdateSessionBody_TreeEntry;
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

  fromJSON(object: any): UpdateSessionBody_TreeEntry {
    const message = {
      ...baseUpdateSessionBody_TreeEntry,
    } as UpdateSessionBody_TreeEntry;
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

  toJSON(message: UpdateSessionBody_TreeEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial(
    object: DeepPartial<UpdateSessionBody_TreeEntry>
  ): UpdateSessionBody_TreeEntry {
    const message = {
      ...baseUpdateSessionBody_TreeEntry,
    } as UpdateSessionBody_TreeEntry;
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

const baseCompileSessionBody: object = { session_id: "" };

export const CompileSessionBody = {
  encode(
    message: CompileSessionBody,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.session_id !== "") {
      writer.uint32(10).string(message.session_id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): CompileSessionBody {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCompileSessionBody } as CompileSessionBody;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.session_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CompileSessionBody {
    const message = { ...baseCompileSessionBody } as CompileSessionBody;
    if (object.session_id !== undefined && object.session_id !== null) {
      message.session_id = String(object.session_id);
    } else {
      message.session_id = "";
    }
    return message;
  },

  toJSON(message: CompileSessionBody): unknown {
    const obj: any = {};
    message.session_id !== undefined && (obj.session_id = message.session_id);
    return obj;
  },

  fromPartial(object: DeepPartial<CompileSessionBody>): CompileSessionBody {
    const message = { ...baseCompileSessionBody } as CompileSessionBody;
    if (object.session_id !== undefined && object.session_id !== null) {
      message.session_id = object.session_id;
    } else {
      message.session_id = "";
    }
    return message;
  },
};

const baseDownloadCompiledSessionBody: object = { session_id: "" };

export const DownloadCompiledSessionBody = {
  encode(
    message: DownloadCompiledSessionBody,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.session_id !== "") {
      writer.uint32(10).string(message.session_id);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): DownloadCompiledSessionBody {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseDownloadCompiledSessionBody,
    } as DownloadCompiledSessionBody;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.session_id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DownloadCompiledSessionBody {
    const message = {
      ...baseDownloadCompiledSessionBody,
    } as DownloadCompiledSessionBody;
    if (object.session_id !== undefined && object.session_id !== null) {
      message.session_id = String(object.session_id);
    } else {
      message.session_id = "";
    }
    return message;
  },

  toJSON(message: DownloadCompiledSessionBody): unknown {
    const obj: any = {};
    message.session_id !== undefined && (obj.session_id = message.session_id);
    return obj;
  },

  fromPartial(
    object: DeepPartial<DownloadCompiledSessionBody>
  ): DownloadCompiledSessionBody {
    const message = {
      ...baseDownloadCompiledSessionBody,
    } as DownloadCompiledSessionBody;
    if (object.session_id !== undefined && object.session_id !== null) {
      message.session_id = object.session_id;
    } else {
      message.session_id = "";
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

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
