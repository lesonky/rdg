export interface SchemaConfig {
  _id?: string;
  type: string;
  name: string;
  config: {
    [key: string]: any;
  };
}

export interface DataConfig {
  fileName: string;
  rowCount: 100;
  schemas: Array<SchemaConfig>;
}
