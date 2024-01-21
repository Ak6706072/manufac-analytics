import React from "react";
import styled from "./grid.module.css";
import { IGrid as IGridProps } from "../../interfaces";
import { Header } from "./grid-header";
import { Table } from "./table";

const Grid = <T extends {}>(props: IGridProps<T>) => {
  const { columnConfig, dataSource } = props;

  return (
    <table className={`manufac-reusable-grid ${styled.table}`}>
      <thead>
        <tr className={`manufac-grid-header-row ${styled.row}`}>
          <Header columnConfig={columnConfig} />
        </tr>
      </thead>
      <tbody>
        <Table columnConfig={columnConfig} dataSource={dataSource} />
      </tbody>
    </table>
  );
};

export default Grid;
