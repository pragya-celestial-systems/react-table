import TablePaginationDemo from "./components/Pagination";
import { TableDataProvider } from "./context/tableData";
import { PaginationProvider } from "./context/PaginationContext";
import { RowProvider } from "./context/RowContext";
import BasicTable from "./components/Table";
import FilterForm from "./components/FilterForm";
import UploadFileForm from "./components/UploadFIleForm";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function App() {
  const tableData = useSelector((state) => state.tableData);
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    if (tableData.length > 0) {
      setHasData(true);
    }
  }, [tableData]);

  return (
    <TableDataProvider>
      <PaginationProvider>
        <RowProvider>
          {hasData ? (
            <>
              <FilterForm />
              <BasicTable />
              <TablePaginationDemo />
            </>
          ) : (
            <UploadFileForm />
          )}
        </RowProvider>
      </PaginationProvider>
    </TableDataProvider>
  );
}

export default App;
