import React from 'react';
import { act, render, screen } from '@testing-library/react';
import App from './App';

test('renders stock app header', async () => {
  act(() => {render(<App />)} )
  const stockAppHeading = await screen.findByText(/stock app/i);
  expect(stockAppHeading).toBeInTheDocument();
});

