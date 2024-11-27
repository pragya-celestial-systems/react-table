import { createSlice } from "@reduxjs/toolkit";

const tableSlice = createSlice({
  name: "table-slice",
  initialState: [],
  reducers: {
    setTableData: (state, action) => {
      return action.payload;
    },
    deleteRow: (state, action) => {
      const { rows } = action.payload;
      const updatedArray = state.filter(
        (data) => !rows.includes(data.unique_key)
      );
      return updatedArray;
    },
  },
});

export const { setTableData, deleteRow } = tableSlice.actions;
export default tableSlice.reducer;
