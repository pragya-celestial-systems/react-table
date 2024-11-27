import React, { useEffect, useState } from "react";
import Column from "./Column";
import { Checkbox } from "@mui/material";
import { useRowContext } from "../context/RowContext";
import { makeStyles } from "@mui/styles";

const useRowStyles = makeStyles({
  tableRow: {
    "&:hover": {
      backgroundColor: "whitesmoke",
      cursor: "pointer",
      transition: "0.3s",
    },
  },
  activeRow: {
    background: "whitesmoke",
  },
});

function Row({ data }) {
  const classes = useRowStyles();
  const [rowData, setRowData] = useState([]);
  const { rowsToBeDeleted, setRowsToBeDeleted } = useRowContext();

  useEffect(() => {
    if (data) {
      const dataArray = Object.values(data);
      setRowData(dataArray);
    }
  }, [data]);

  function handleCheck(key) {
    setRowsToBeDeleted((prevState) => [...prevState, key]);
  }

  return (
    <tr data-row-index={data.unique_key} className={classes.tableRow}>
      <Checkbox
        onChange={() => handleCheck(data.unique_key)}
        checked={rowsToBeDeleted.includes(data.unique_key)}
      />
      {rowData.map((value, index) => (
        <Column
          value={value}
          key={index}
          tableClass={
            rowsToBeDeleted.includes(data.unique_key) ? classes.activeRow : ""
          }
        />
      ))}
    </tr>
  );
}

export default Row;
