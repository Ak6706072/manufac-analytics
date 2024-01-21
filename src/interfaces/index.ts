export interface IRecords {
  value: string | number;
  schema: string;
}

export interface IColumn<T> {
  render: (data: T) => JSX.Element | string;
  name: string | JSX.Element;
  width?: number;
  dataIndex: number;
}

export interface IDataSource<T> {
  columnRecords: T[];
}

export interface IGrid<T> {
  columnConfig: IColumn<T>[];
  dataSource: IDataSource<T>[];
}

export interface IDataSet {
  Gamma?: number;
  Flavanoids: number;
  [key: string]: any;
}
