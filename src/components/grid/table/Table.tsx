import React from "react";
import { IGrid } from "../../../interfaces";
import styled from "../grid.module.css";

const Table = <T,>(props: IGrid<T>) => {
  const { dataSource, columnConfig } = props;
  return (
    <>
      {dataSource?.map((row, index) => {
        return (
          <tr className={`manufac-grid-header-row ${styled.row}`} key={index}>
            {columnConfig?.map((column, index) => {
              return (
                <td
                  key={index} //instead of index should be having id instead of index
                  className={`manufac-grid-body-cell ${styled.cell}`}
                >
                  {column?.render(row?.columnRecords[column?.dataIndex])}
                </td>
              );
            })}
          </tr>
        );
      })}
    </>
  );
};

export default Table;
