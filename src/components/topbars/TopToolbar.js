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

const TopToolbar = ({ setShowHistory, showHistory, value, setQuery }) => {
  const onSubmit = () => {
    var Z = value.toLowerCase().slice(value.indexOf('from') + 'from'.length);
    setQuery(Z.split(' ')[1]);
  };
  return (
    <Box className="bg-primary-dark" px={4}>
      <Flex h={12} justifyContent={'space-between'}>
        <Flex>
          <Center w="100px" mr={'5px'}>
            <Text className="text-white" size="sm">
              Database:
            </Text>
          </Center>

          <Select color={'white'} size={'sm'} mt={'2'}>
            <option value="local" selected={true}>
              Local
            </option>
          </Select>
          <Flex shrink={'0'} ml={'5'} mt={'2'}>
            <text className="text-white">Saved Queries</text>

            <Switch
              defaultChecked={true}
              id="history-switch"
              onChange={e => setShowHistory(!showHistory)}
              ml={'2'}
              mt={'1'}
            />
          </Flex>
        </Flex>
        <Tooltip label="ALT+R">
          <Button
            mr="4"
            onClick={() => onSubmit()}
            mt={'1'}
            className="text-primary-dark"
          >
            RUN Query
          </Button>
        </Tooltip>
      </Flex>
    </Box>
  );
};

export default TopToolbar;
