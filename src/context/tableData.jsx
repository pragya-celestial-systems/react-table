import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const dataContext = createContext();

export function TableDataProvider({ children }) {
  const [filteredData, setFilteredData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const data = useSelector((state) => state.tableData);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  return (
    <dataContext.Provider
      value={{ filteredData, setFilteredData, tableData, setTableData }}
    >
      {children}
    </dataContext.Provider>
  );
}

export function useTableData() {
  return useContext(dataContext);
}
