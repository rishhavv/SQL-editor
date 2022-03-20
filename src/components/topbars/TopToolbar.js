//includes Select DB, show saved query switch & Run, save query button

import React from 'react';
import {
  Box,
  Flex,
  Button,
  Center,
  Select,
  Text,
  Switch,
  Tooltip,
} from '@chakra-ui/react';
import '../../styles/output.css';
import toast from 'react-hot-toast';

const TopToolbar = ({
  setshowSavedQueries,
  showSavedQueries,
  value,
  setQuery,
  isTabletOrMobile,
  setSavedQueries,
  savedQueries,
}) => {
  //on run button click
  const onSubmit = () => {
    var Z = value.toLowerCase().slice(value.indexOf('from') + 'from'.length);
    setQuery(Z.split(' ')[1]);
  };

  //on save button click
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
    <Box className="bg-primary-dark" px={4}>
      <Flex h={12} justifyContent={'space-between'}>
        <Flex>
          {!isTabletOrMobile && (
            <>
              <Center w="100px" mr={'5px'}>
                <Text className="text-white" size="sm">
                  Database:
                </Text>
              </Center>
              <Select color={'white'} size={'sm'} mt={'2'} id="DB">
                <option value="local" selected={true}>
                  Local
                </option>
              </Select>
            </>
          )}
          <Flex shrink={'0'} ml={'5'} mt={'2'}>
            <div aria-label="Saved Queries" className="text-white">
              Saved Queries
            </div>

            <Switch
              isChecked={showSavedQueries}
              id="history-switch"
              onChange={e => setshowSavedQueries(!showSavedQueries)}
              ml={'2'}
              mt={'1'}
              aria-label="saved queries"
            />
          </Flex>
        </Flex>
        <div>
          <Tooltip label="ALT+S">
            <Button
              size={isTabletOrMobile ? 'sm' : 'md'}
              mr={isTabletOrMobile ? '1.5' : '4'}
              onClick={() => onSave()}
              mt={'1'}
              className="text-primary-dark"
            >
              {isTabletOrMobile ? 'SAVE' : 'SAVE Query'}
            </Button>
          </Tooltip>

          <Tooltip label="ALT+R">
            <Button
              size={isTabletOrMobile ? 'sm' : 'md'}
              mr={!isTabletOrMobile && '4'}
              onClick={() => onSubmit()}
              mt={'1'}
              className="text-primary-dark"
            >
              {isTabletOrMobile ? 'RUN' : ' RUN Query'}
            </Button>
          </Tooltip>
        </div>
      </Flex>
    </Box>
  );
};

export default TopToolbar;
