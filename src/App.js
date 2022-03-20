import React, { Suspense, useState, useEffect } from 'react';
import { ChakraProvider, Box, theme, Center } from '@chakra-ui/react';
import Titlebar from './components/topbars/Titlebar';
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

//main App
function App() {
  const [query, setQuery] = useState('');
  const [value, setValue] = useState('select * from customers');
  const [showSavedQueries, setshowSavedQueries] = useState(true);
  const [savedQueries, setSavedQueries] = useState([]);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 640px)' });

  //setting showSavedQueries to default off mode in mobile view
  useEffect(() => {
    setshowSavedQueries(!isTabletOrMobile);
  }, [isTabletOrMobile]);

  //Populating saved queries pane
  useEffect(() => {
    setSavedQueries(TABLE_NAMES);
  }, []);
  //submit a query
  const onSubmit = () => {
    var Z = value.toLowerCase().slice(value.indexOf('from') + 'from'.length);
    setQuery(Z.split(' ')[1]);
  };
  //Save a query
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
    //chakra provides for dark mode enable(to be added)
    <ChakraProvider theme={theme}>
      {/* keyboard shortcuts */}
      <Hotkeys keyName="alt+r" onKeyDown={() => onSubmit()} />
      <Hotkeys keyName="alt+s" onKeyDown={() => onSave()} />
      {/* Toaster layout */}
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
      {/*Heading bar */}
      <Titlebar />
      <Suspense fallback={<Spinner />}>
        {/* Top toolbar with buttons - RUN,Save etc */}
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
        {/* Saved queries pane and editor */}
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
        {/* conditional render of result table */}
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
