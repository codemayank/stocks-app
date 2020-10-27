import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { ColorModeSwitch } from './ColorModeSwitch';
import {ChakraProvider} from '@chakra-ui/core'
import { act } from 'react-dom/test-utils';



describe('<ColorModeSwitch />', () => {
  test('Changes inner text on click', async () => {
    let {findByRole} = render(<ChakraProvider><ColorModeSwitch /></ChakraProvider>);
    let btn = await findByRole('button');
    
    
    expect(btn.textContent).toEqual('Dark Mode')
    act(() => {
      fireEvent.click(btn);
    }) 
    expect(btn.textContent).toEqual('Light Mode')
  })
  
})

