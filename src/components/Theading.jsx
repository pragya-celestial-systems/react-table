import React, { useState } from "react";
import { Box, TableCell } from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { useTableData } from "../context/tableData";

const sortTypes = ["default", "ascending", "descending"];

function THeading({ index, heading, columnKey }) {
  const [sort, setSort] = useState(0);
  const { filteredData, setFilteredData } = useTableData();

  function handleSortColumn(e) {
    setSort((prevState) => (prevState + 1) % 3);
    const sortKey = Number(e.currentTarget.dataset.sort);
    const sortType = sortTypes[sortKey];

    const sortedData = [...filteredData];

    if (sortType === "default") {
      setFilteredData([...filteredData]);
    } else if (sortType === "ascending") {
      sortedData.sort((a, b) => {
        if (typeof a[columnKey] === "string") {
          return a[columnKey].localeCompare(b[columnKey]);
        }
        if (typeof a[columnKey] === "number") {
          return a[columnKey] - b[columnKey];
        }
        return 0;
      });
      setFilteredData(sortedData);
    } else if (sortType === "descending") {
      sortedData.sort((a, b) => {
        if (typeof a[columnKey] === "string") {
          return b[columnKey].localeCompare(a[columnKey]);
        }
        if (typeof a[columnKey] === "number") {
          return b[columnKey] - a[columnKey];
        }
        return 0;
      });
      setFilteredData(sortedData);
    }
  }

  return (
    heading !== "unique_key" && (
      <TableCell key={index}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            color: "grey",
          }}
          data-sort={sort}
          onClick={handleSortColumn}
        >
          <SwapVertIcon sx={{ marginRight: 1 }} />
          {heading}
        </Box>
      </TableCell>
    )
  );
}

export default THeading;
