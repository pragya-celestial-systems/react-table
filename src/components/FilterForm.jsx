import * as React from "react";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useTableData } from "../context/tableData";
import { makeStyles } from "@mui/styles";

const useFormStyles = makeStyles({
  formContainer: {
    width: "80%",
    margin: "2rem auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  button: {
    width: "100px",
    padding: "0.8rem 0",
    fontSize: "1rem",
  },
});

export default function InputAdornments() {
  const classes = useFormStyles();
  const [searchVal, setSearchVal] = React.useState("");
  const data = useSelector((state) => state.tableData);
  const { tableData, setTableData } = useTableData();

  function handleSearchQuery() {
    if (!searchVal) {
      setTableData(data);
      return;
    }

    const filteredData = tableData.filter((data) => {
      const dataObj = Object.values(data);
      return dataObj.find((value) =>
        value.toString().toLowerCase().includes(searchVal.toLowerCase())
      );
    });

    setTableData(filteredData);
    setSearchVal("");
  }

  function handleChangeSearch(e) {
    if (e.target.value === "") {
      setTableData(data);
    }

    setSearchVal(e.target.value);
  }

  function handleResetSearch() {
    setTableData(data);
  }

  return (
    <div className={classes.formContainer}>
      <TextField
        value={searchVal}
        onChange={handleChangeSearch}
        label="Search Data"
        id="outlined-start-adornment"
        sx={{ m: 1, width: "25ch" }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SwapVertIcon />
              </InputAdornment>
            ),
          },
        }}
      />
      <Button
        variant="contained"
        onClick={handleSearchQuery}
        className={classes.button}
      >
        Search
      </Button>
      <Button
        className={classes.button}
        variant="contained"
        onClick={handleResetSearch}
        color="error"
      >
        Reset
      </Button>
    </div>
  );
}
