import React, { useEffect, useRef } from "react";
import users from "../database/users.data";
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
import { deleteRow, setTableData } from "../store/slices/table.slice";
import { v4 as uuidv4 } from "uuid";

export default function BasicTable() {
  const dispatch = useDispatch();
  const { tableData } = useTableData();
  const { filteredData, setFilteredData } = useTableData();
  const { currentPage, rows } = usePagination();
  const { rowsToBeDeleted, setRowsToBeDeleted } = useRowContext();
  const tableRef = useRef();

  useEffect(() => {
    if (users) {
      dispatch(setTableData(users));
    }
  }, [users]);

  useEffect(() => {
    const data = JSON.parse(JSON.stringify(users));
    data?.forEach((data) => {
      data.unique_key = uuidv4();
    });

    dispatch(setTableData(data));
  }, []);

  useEffect(() => {
    if (tableData) {
      setFilteredData(
        tableData.slice(currentPage * rows, currentPage * 10 + rows)
      );
    }
  }, [currentPage, rows, tableData]);

  function handleDeleteRow() {
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
