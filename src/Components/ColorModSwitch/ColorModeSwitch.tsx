import { Button, useColorMode } from '@chakra-ui/core';
import React from 'react';

export function ColorModeSwitch(){
  
  const {colorMode, toggleColorMode} = useColorMode()
  
  return <Button colorScheme="teal" variant="outline" size="sm" onClick={toggleColorMode}>{`${colorMode === 'dark' ? 'Light' : 'Dark'} Mode`}</Button>
}