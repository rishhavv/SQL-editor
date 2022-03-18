import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import '../../styles/output.css';

export default function Titlebar() {
  return (
    <Box className="bg-primary-light" px={4}>
      <Flex h={12} alignItems={'center'} justifyContent={'space-between'}>
        <Box>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/1/1e/Atlan-logo-full.svg"
            loading="lazy"
            alt="Atlan"
            style={{ objectFit: 'contain', width: '100px' }}
          />
        </Box>
      </Flex>
    </Box>
  );
}
