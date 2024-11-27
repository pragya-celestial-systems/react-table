import TablePaginationDemo from "./components/Pagination";
import { TableDataProvider } from "./context/tableData";
import { PaginationProvider } from "./context/PaginationContext";
import { RowProvider } from "./context/RowContext";
import BasicTable from "./components/Table";
import FilterForm from "./components/FilterForm";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <TableDataProvider>
        <PaginationProvider>
          <RowProvider>
            <FilterForm />
            <BasicTable />
            <TablePaginationDemo />
          </RowProvider>
        </PaginationProvider>
      </TableDataProvider>
    </Provider>
  );
}

export default App;
