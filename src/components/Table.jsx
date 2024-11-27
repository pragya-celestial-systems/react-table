import React, { useEffect, useRef } from "react";
import TableHeadings from "./TableHeadings";
import Row from "./Row";
import { useTableData } from "../context/tableData";
import { usePagination } from "../context/PaginationContext";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import DeleteButton from "./DeleteButton";
import { useRowContext } from "../context/RowContext";
import { useDispatch } from "react-redux";
import { deleteRow } from "../store/slices/table.slice";

export default function BasicTable() {
  const dispatch = useDispatch();
  const { tableData } = useTableData();
  const { filteredData, setFilteredData } = useTableData();
  const { currentPage, rows } = usePagination();
  const { rowsToBeDeleted, setRowsToBeDeleted } = useRowContext();
  const tableRef = useRef();

  useEffect(() => {
    if (tableData) {
      setFilteredData(
        tableData.slice(currentPage * rows, currentPage * 10 + rows)
      );
    }
  }, [currentPage, rows, tableData]);

  function handleDeleteRow() {
    const confirm = window.confirm(
      "Are you sure you want to delete the selected rows?"
    );

    if (!confirm) return;

    dispatch(deleteRow({ rows: rowsToBeDeleted }));
    setRowsToBeDeleted([]);
  }

  return (
    <>
      {rowsToBeDeleted.length > 0 && (
        <DeleteButton onDelete={handleDeleteRow} />
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHead>
            <TableHeadings headings={filteredData[0]} />
          </TableHead>
          <TableBody ref={tableRef}>
            {filteredData.map((row, index) => (
              <Row key={index} data={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
