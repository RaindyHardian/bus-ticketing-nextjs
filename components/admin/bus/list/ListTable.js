import { useTable, useSortBy, usePagination } from "react-table";
import styles from "./listTable.module.css";

export default function ListTable({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useSortBy,
    usePagination
  );

  return (
    <>
      <div>
        <table {...getTableProps()} className={styles.table}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps(), {
                      className: column.collapse ? "collapse" : "",
                    })}
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps({
                          className: cell.column.collapse ? "collapse" : "",
                        })}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      </div>
      <div className={styles.pagination}>
        <button
          className={styles.pageButton}
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {"<<"}
        </button>
        <button
          className={styles.pageButton}
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {"<"}
        </button>
        <button
          className={styles.pageButton}
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {">"}
        </button>
        <button
          className={styles.pageButton}
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {">>"}
        </button>
        <span className={styles.pagePanelGroup}>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        {"|"}
        <span className={styles.pagePanelGroup}>
          Go to page:
          <input
            className={styles.pageNumberInput}
            type="number"
            min="1"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
          />
        </span>
        <select
          className={styles.pageShowSelect}
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
