import React from 'react';
import {cleanup, render} from '@testing-library/react';
import StockStat from './StockStat';


afterEach(cleanup);

describe("<StockStat />", () => {
  test("Should render stock stat", async () => {
    let priceChange: statArrowProp = 'increase';
    const stockStat = {
      name: 'appl', price: 113, priceChange, priceChangePercent: 10
    }
    let {findByTestId} = render(<StockStat {...stockStat} />);
    let label = await findByTestId("label");
    let price = await findByTestId('price')

    expect(label).toHaveTextContent('appl');
    expect(price).toHaveTextContent(stockStat.price.toString())
    

  })
})