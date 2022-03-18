import React, { Suspense, useState } from 'react';
import { ChakraProvider, Box, theme, Flex, Center } from '@chakra-ui/react';
import Navbar from './components/topbars/Titlebar';
import './styles/output.css';
import Hotkeys from 'react-hot-keys';
import Spinner from './components/subcomponents/LoadSpinner';
const Editor = React.lazy(() => import('./components/editor/Editor'));
const TopToolbar = React.lazy(() => import('./components/topbars/TopToolbar'));
const ResultTableSection = React.lazy(() =>
  import('./components/resultTable/ResultTableSection')
);
const History = React.lazy(() => import('./components/savedQueriesView/SavedQueriesPane'));

function App() {
  const [query, setQuery] = useState('');
  const [value, setValue] = useState('select * from customers');
  const [showHistory, setShowHistory] = useState(true);

  const onSubmit = () => {
    var Z = value.toLowerCase().slice(value.indexOf('from') + 'from'.length);
    setQuery(Z.split(' ')[1]);
  };

  return (
    <ChakraProvider theme={theme}>
      <Hotkeys keyName="alt+r" onKeyDown={() => onSubmit()} />
      <Navbar />
      <Suspense fallback={<Spinner />}>
        <TopToolbar
          setShowHistory={setShowHistory}
          showHistory={showHistory}
          setQuery={setQuery}
          value={value}
        />
      </Suspense>

      <Suspense
        fallback={
          <Center width={'100%'} mt={'20'}>
            <Spinner />
          </Center>
        }
      >
        <Box borderWidth="2px" borderBottomColor={'#1913AE'}>
          <Flex>
            {showHistory && (
              <Box>
                <History setQuery={setQuery} setValue={setValue} />
              </Box>
            )}
            <Box flex={1} borderWidth="0.5px" mx={4}>
              <Editor
                setQuery={setQuery}
                value={value}
                setValue={setValue}
              
              />
            </Box>
          </Flex>
        </Box>
      </Suspense>
      <Suspense
        fallback={
          <Center width={'100%'} mt={'20'}>
            <Spinner />
          </Center>
        }
      >
        <div>
          {query ? <ResultTableSection query={query} /> : null}
        </div>
      </Suspense>
    </ChakraProvider>
  );
}

export default App;
