import { TableCell } from "@mui/material";
import React from "react";

function Column({ value, tableClass }) {
  return <TableCell className={tableClass}>{value}</TableCell>;
}

export default Column;
