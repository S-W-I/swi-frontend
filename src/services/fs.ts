import axios from "axios";
import {
  Session,
  SessionTree,
  CompilationInfo,
  SessionLegacyNode,
} from "../protobuf/session";
import { UpdateSessionBody } from "../protobuf/transport";

export class SessionClient {
  endpoint: string;

  constructor(props: { endpoint: string }) {
    this.endpoint = props.endpoint;
  }

  async initNewSession(): Promise<Session> {
    const resp = await axios.post(
      "/session/new",
      {},
      {
        baseURL: this.endpoint,
      }
    );

    return Session.fromJSON(resp.data.result);
  }

  async fetchSessionCodeLegacyTree(
    session_id: string
  ): Promise<SessionLegacyNode[]> {
    const resp = await axios.post(
      "/session/code/legacy/tree",
      {
        session_id,
      },
      {
        baseURL: this.endpoint,
      }
    );

    return resp.data.result.map((x) => {
      const res = SessionLegacyNode.fromJSON(x);
      console.log({ x, res });
      return res;
    });
  }

  async fetchSessionCodeTree(session_id: string): Promise<SessionTree> {
    const resp = await axios.post(
      "/session/code/tree",
      {
        session_id,
      },
      {
        baseURL: this.endpoint,
      }
    );

    return SessionTree.fromJSON(resp.data.result);
  }

  async compileSessionCode(session_id: string): Promise<CompilationInfo> {
    const resp = await axios.post(
      "/session/code/compile",
      {
        session_id,
      },
      {
        baseURL: this.endpoint,
      }
    );

    return CompilationInfo.fromJSON(resp.data.result);
  }

  async updateSessionCode(
    update_entry: UpdateSessionBody
  ): Promise<CompilationInfo> {
    const resp = await axios.post("/session/code/update", update_entry, {
      baseURL: this.endpoint,
    });

    return CompilationInfo.fromJSON(resp.data.result);
  }

  buildDownloadSessionCompileCodeLink(session_id: string): string {
    return `${this.endpoint}/session/code/download/alt?session=${session_id}`;
  }

  async downloadSessionCompiledCode(session_id: string): Promise<Uint8Array> {
    const resp = await axios.post(
      "/session/code/download",
      {
        session_id,
      },
      {
        baseURL: this.endpoint,
      }
    );

    // return SessionTree.fromJSON(resp.data.result);
    return resp.data;
  }
}
