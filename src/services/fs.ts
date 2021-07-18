import axios from "axios";

export interface IDEFileEntity {
  Name: string;
  IsFile: boolean;
  Children?: IDEFileEntity[];
}

export type IDEBackendServiceParams = {
  endpoint: string;
};

export class IDEBackendService {
  params: IDEBackendServiceParams;

  constructor(params: IDEBackendServiceParams) {
    this.params = params;
  }

  async fetchData(): Promise<IDEFileEntity> {
    const resp = await axios.get(this.params.endpoint);
    return resp.data;
  }
}
