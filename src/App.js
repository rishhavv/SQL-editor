import React, { Suspense, useState, useEffect } from 'react';
import { ChakraProvider, Box, theme, Center } from '@chakra-ui/react';
import Navbar from './components/topbars/Titlebar';
import { useMediaQuery } from 'react-responsive';
import './styles/output.css';
import Hotkeys from 'react-hot-keys';
import Spinner from './components/subcomponents/LoadSpinner';
import TABLE_NAMES from './static/tableNames';
import { Toaster, toast } from 'react-hot-toast';
const Editor = React.lazy(() => import('./components/editor/Editor'));
const TopToolbar = React.lazy(() => import('./components/topbars/TopToolbar'));
const ResultTableSection = React.lazy(() =>
  import('./components/resultTable/ResultTableSection')
);
const SavedQueriesPane = React.lazy(() =>
  import('./components/savedQueriesView/SavedQueriesPane')
);

function App() {
  const [query, setQuery] = useState('');
  const [value, setValue] = useState('select * from customers');
  const [showSavedQueries, setshowSavedQueries] = useState(true);
  const [savedQueries, setSavedQueries] = useState([]);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 640px)' });

  useEffect(() => {
    setshowSavedQueries(!isTabletOrMobile);
  }, [isTabletOrMobile]);
  useEffect(() => {
    setSavedQueries(TABLE_NAMES);
  }, []);

  const onSubmit = () => {
    var Z = value.toLowerCase().slice(value.indexOf('from') + 'from'.length);
    setQuery(Z.split(' ')[1]);
  };
  const onSave = () => {
    var Z = value.toLowerCase().slice(value.indexOf('from') + 'from'.length);
    if (savedQueries.includes(Z.split(' ')[1]) === false) {
      setSavedQueries([...savedQueries, Z.split(' ')[1]]);
      toast.success(`${Z.split(' ')[1].toUpperCase()} query saved!`);
    } else {
      toast.error('Query Already saved');
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Hotkeys keyName="alt+r" onKeyDown={() => onSubmit()} />
      <Hotkeys keyName="alt+s" onKeyDown={() => onSave()} />
      <Toaster
        position="top-center"
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: '',
          duration: 5000,
          style: {
            background: '#ffffff',
            color: '#3A4374',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#1913AE',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#D73737',
              secondary: '#ffffff',
            },
          },
        }}
      />
      <Navbar />
      <Suspense fallback={<Spinner />}>
        <TopToolbar
          setshowSavedQueries={setshowSavedQueries}
          showSavedQueries={showSavedQueries}
          setQuery={setQuery}
          value={value}
          isTabletOrMobile={isTabletOrMobile}
          setSavedQueries={setSavedQueries}
          savedQueries={savedQueries}
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
          <Box display={!isTabletOrMobile ? 'flex' : 'block'}>
            {showSavedQueries && (
              <Box>
                <SavedQueriesPane
                  setQuery={setQuery}
                  setValue={setValue}
                  savedQueries={savedQueries}
                />
              </Box>
            )}
            <Box flex={1} borderWidth="0.5px" mx={isTabletOrMobile ? '0' : '4'}>
              <Editor setQuery={setQuery} value={value} setValue={setValue} />
            </Box>
          </Box>
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
          {query ? (
            <ResultTableSection
              query={query}
              isTabletOrMobile={isTabletOrMobile}
            />
          ) : null}
        </div>
      </Suspense>
    </ChakraProvider>
  );
}

export default App;
