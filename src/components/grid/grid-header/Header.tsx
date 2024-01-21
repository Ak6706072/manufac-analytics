import React from "react";
import { IColumn } from "../../../interfaces";
import styled from "../grid.module.css";
import { DEFAULT_COLUMN_WIDTH } from "../../../constants";

interface IHeader<T> {
  columnConfig: IColumn<T>[];
}

const Header = <T,>(props: IHeader<T>): JSX.Element => {
  const { columnConfig } = props;

  const getComputedStyle = (width?: number) => {
    if (width && typeof width === "number") return { width: width };

    return { width: DEFAULT_COLUMN_WIDTH };
  };

  return (
    <>
      {columnConfig?.map((column, index) => {
        return (
          <th
            key={index}
            className={`manufac-grid-header-cell ${styled.cell}`}
            style={getComputedStyle(column?.width)}
          >
            {column.name}
          </th>
        );
      })}
    </>
  );
};

export default Header;
