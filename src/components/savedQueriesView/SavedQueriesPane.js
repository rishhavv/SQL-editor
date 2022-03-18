import React from 'react';
import {
  Box,
  Center,
} from '@chakra-ui/react';
import '../../styles/output.css';
import TABLE_NAMES from '../../static/tableNames';

const History = ({ setValue, setQuery }) => {

  const handleQuery = queryName => {
    setQuery(queryName);
    setValue(`select * from ${queryName}`);
  };

  const convertToNormalString = str => {
    var i,
      frags = str.split('_');
    for (i = 0; i < frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(' ');
  };

  return (
    <div className="bg-primary-light px-2">
      <Center>
        <div className="text-primary-dark font-bold">Saved Queries</div>
      </Center>

      <Box className="overflow-auto" maxHeight={'300'}>
        {TABLE_NAMES.map(name => {
          const finalName = convertToNormalString(name);
          return (
            <button
              className="flex items-center p-2 my-2 transition-colors text-primary-dark hover:text-white hover:bg-primary-dark duration-200 rounded-lg "
              key={name}
              onClick={() => {
                handleQuery(name);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="mx-4 text-base font-normal">{finalName}</span>
            </button>
          );
        })}
      </Box>
    </div>
  );
};
export default History;
