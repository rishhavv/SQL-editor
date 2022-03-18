import React, { useState } from 'react';
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  usePagination,
} from 'react-table';
import { Button } from '@chakra-ui/react';
import CsvDownload from 'react-json-to-csv';
import { Helmet } from 'react-helmet';
import '../../styles/output.css';
import { exportToJson } from '../../modules/exportToJSON';

const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <>
      <Helmet>
        <title>{`${count} Records found || React SQL Editor`}</title>
      </Helmet>
      <label className="flex gap-x-2 items-baseline">
        <span className="text-white hidden md:inline-block ml-3">Search: </span>
        <input
          type="text"
          className="text-black rounded-lg shadow-sm outline-none border-2 border-gray-300 focus:border-primary-dark transition w-40 md:w-52 "
          value={value || ''}
          onChange={e => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`${count} records...`}
        />
      </label>
    </>
  );
};

const Table = ({ columns, data, completeData, query }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    state,
    setPageSize,
    pageOptions,
    gotoPage,
    pageCount,
    setGlobalFilter,
    preGlobalFilteredRows,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  return (
    <>
      <div className="flex justify-between items-center bg-primary-dark p-2">
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        <div>
          <CsvDownload
            className="bg-primary-light transition-colors text-primary-dark rounded-md font-semibold px-2 py-1 mr-3 shadow-lg"
            data={completeData}
            filename={`${query}.csv`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2 inline"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <title id="download">Download CSV</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>{' '}
            CSV
          </CsvDownload>
          <Button
            onClick={() => exportToJson(completeData, query)}
            size={'sm'}
            className="text-primary-dark"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2 inline"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <title id="download">Download JSON</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            JSON
          </Button>
        </div>
      </div>

      {/* table */}
      <div className="shadow overflow-auto border-b border-gray-200">
        <table {...getTableProps()}>
          <thead className="bg-gray">
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    scope="col"
                    className="px-6 text-left text-xs font-medium text-primary-dark uppercase tracking-wider"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    <span className=" hover:text-gray-300">
                      {column.render('Header')}
                    </span>
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' ▼'
                          : ' ▲'
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody
            {...getTableBodyProps()}
            className="bg-white text-black divide-y divide-gray-200"
          >
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className="px-6 whitespace-nowrap text-sm text-gray-500"
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="py-1 flex items-center justify-between bg-primary-dark  ">
        <div className="flex-1 flex justify-between sm:hidden">
          <Button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="text-primary-dark"
          >
            Previous
          </Button>
          <Button
            className="text-primary-dark"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            Next
          </Button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div className="flex gap-x-2">
            <span className="text-sm text-gray-700">
              Page <span className="font-medium">{state.pageIndex + 1}</span> of{' '}
              <span className="font-medium">{pageOptions.length}</span>
            </span>
            <select
              className="text-black outline-none bg-white border-2 border-transparent focus:border-primary-dark rounded-md cursor-pointer"
              value={state.pageSize}
              onChange={e => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[5, 10, 20].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm "
              aria-label="Pagination"
            >
              <Button
                size={'sm'}
                className="rounded-l-md text-primary-dark mr-2"
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                <span className="sr-only">First</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <title id="pageOne">Go to page one</title>
                  <path
                    fillRule="evenodd"
                    d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
              <Button
                size={'sm'}
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
                className="text-primary-dark mr-3"
              >
                <span className="sr-only">Previous</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <title id="previousPage">Go to previous page</title>
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
              <Button
                size={'sm'}
                className=" text-primary-dark mr-2"
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                <span className="sr-only">Next</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <title id="nextPage">Go to next page</title>
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
              <Button
                size={'sm'}
                className="rounded-l-md text-primary-dark mr-2"
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                <span className="sr-only">Last</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <title id="lastPage">Go to last page</title>
                  <path
                    fillRule="evenodd"
                    d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
