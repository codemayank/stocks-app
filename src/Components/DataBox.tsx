import { Box } from '@chakra-ui/core';
import React, { FC } from 'react';

interface props {
  data: string;
  bgColor?: string;

}

const DataBox: FC<props> = ({data, bgColor}) => {  
  return <Box padding="0.5rem" color={bgColor}>{data}</Box>
}

export default DataBox;