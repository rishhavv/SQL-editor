//Result table part of App, includes the everthing below the editor and Saved queries pane

import React, { useMemo } from 'react';
import useGetData from '../customhooks/useGetData';
import Table from './Table';
import '../../styles/output.css';
import LoadSpinner from '../subcomponents/LoadSpinner';
import { Center } from '@chakra-ui/react';

const ResultTableSection = React.memo(({ query, isTabletOrMobile }) => {
  const { data, error } = useGetData(query);
//using memoisation to fetch results quicker
  const columns = useMemo(() => {
    if (data.length > 0) {
      return Object.keys(data[0]).map(key => {
        const result = data[0][key]
          .replace(/([A-Z]+)/g, ' $1')
          .replace(/([A-Z][a-z])/g, ' $1');

        return {
          Header: result,
          accessor: key,
        };
      });
    }
  }, [data]);

  const queryData = useMemo(() => data.slice(1), [data]);
  if (error)
  //if error occurs show:
    return (
      <section
        className={`${
          false ? 'col-start-2' : 'col-start-1'
        } col-end-3 row-start-3 row-end-4 text-white m-6`}
      >
        <h1 className="text-center font-bold text-xl text-primary-dark">
          Something Went Wrong{' '}
          <span role="img" aria-label="sad face">
            😔
          </span>
        </h1>
      </section>
    );
  return (
    <>
      <section className="col-start-1 col-end-3 row-start-3 row-end-4 text-white overflow-hidden">
        {/* When data length is not null return: */}
        {data.length > 0 ? (
          <>
            <Table
              columns={columns}
              completeData={data}
              data={queryData}
              query={query}
              isTabletOrMobile={isTabletOrMobile}
            />
          </>
        ) : (
          <Center width={'100%'}>
            <LoadSpinner />
          </Center>
        )}
      </section>
    </>
  );
});

export default ResultTableSection;
