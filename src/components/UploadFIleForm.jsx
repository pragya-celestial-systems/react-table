import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setTableData } from "../store/slices/table.slice";
import { v4 as uuidv4 } from "uuid";
import { makeStyles } from "@mui/styles";

const useFromStyles = makeStyles({
  container: {
    height: "100svh",
    width: "100svw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    padding: "2rem",
    background: "whitesmoke",
    borderRadius: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "300px",
    width: "300px",
  },
  input: {
    outline: "none",
  },
  button: {
    marginTop: "1rem !important",
  },
});

function UploadFileForm() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const classes = useFromStyles();

  async function fetchJsonData() {
    const formData = new FormData();
    formData.append("jsonFile", file);
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/parser/json`,
      formData
    );

    const dataStr = JSON.stringify(response.data);
    setData(JSON.parse(dataStr));
  }

  async function fetchCsvData() {
    const formData = new FormData();
    formData.append("csvFile", file);

    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/parser/csv`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const dataArray = response.data;
    setData(dataArray);
  }

  function addUniqueKey() {
    const updatedData = data.map((item) => ({
      ...item,
      unique_key: uuidv4(),
    }));

    return updatedData;
  }

  async function handleFileUpload() {
    if (!file) {
      alert("Please select the file first.");
      return;
    }

    const allowedTypes = ["application/json", "text/csv"];
    if (!allowedTypes.includes(file.type)) {
      alert("You can upload only .json or .csv files.");
      return;
    }

    try {
      if (file.type === "application/json") {
        fetchJsonData();
      }

      if (file.type === "text/csv") {
        fetchCsvData();
      }

      const updatedData = addUniqueKey();
      dispatch(setTableData(updatedData));
    } catch (error) {
      console.error(error);
      alert("Something went wrong while uploading file. Please try again!");
    }
  }

  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }

  return (
    <div className={classes.container}>
      <form className={classes.form}>
        <TextField
          className={classes.input}
          onChange={handleFileChange}
          variant="outlined"
          type="file"
          inputProps={{ accept: ".json,.csv" }}
        />
        <Button
          onClick={handleFileUpload}
          variant="contained"
          className={classes.button}
        >
          Upload
        </Button>
      </form>
    </div>
  );
}

export default UploadFileForm;
