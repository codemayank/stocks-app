import React, { useEffect, useReducer, useState } from 'react';
import './App.css';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import {ChakraProvider, Flex, Box, CSSReset, Heading, Spacer, SimpleGrid} from '@chakra-ui/core';
import { ColorModeSwitch } from './Components/ColorModeSwitch';

import CustomTheme from './theme'
import StockStat from './Components/StockStat';
import stockDataReducer from './reducers/stockDataReducer';
import { webSocketUrl } from './config/constants';

function App() {
  
  const [messageHistory, dispatch] = useReducer(stockDataReducer, null)
  const [tickCounter, setTicker] = useState<number>(0)
  const {lastMessage, readyState} = useWebSocket(webSocketUrl)
  
  useEffect(() => {
    if(lastMessage){
      let updateMessageHistory = {
        type: "update",
        data: lastMessage
      }
      setTicker(tickCounter + 1)
      dispatch(updateMessageHistory);
    }    
  }, [lastMessage])

  let stockData: Array<StockDataDisplay | null> = [];
  
  messageHistory?.forEach((value: TickerData, key: string) => {
    let id = key.split("").reduce((id , char) => id + char.charCodeAt(0), 0)
    let ticker = {
      ticker: key,
      value: value,
      id  
    }
    stockData.push(ticker);
  })

  stockData.sort((a, b) => a && b ? a.id - b.id : 0);

  
  return (
    <ChakraProvider theme={CustomTheme}>
      <CSSReset />
      <Flex
        alignItems="center"
        direction={["column", "column", "column", "row"]}
        justifyContent={["flex-start", "flex-start", "flex-start", "space-around"]}
        minHeight="100vh"
      >
        <Flex
          direction={["row", "row", "row", "column"]}
          width={["100%", "100%", "100%", "40%"]}
          alignItems="center"
          justifyContent="space-around"
        >
          <Box p="1rem 2rem">
            <Heading>Stock App</Heading>
          </Box>
          <Spacer />
          <Box p="1rem 2rem">
            <ColorModeSwitch />
          </Box>
        </Flex>

        <SimpleGrid columns={[3, 5]} spacing={1}>
          {stockData.map(stock => stock ? (
            <StockStat
              name={stock.ticker}
              price={stock.value.price}
              priceChange={stock.value.priceChange}
              priceChangePercent={stock.value.priceChangePercent}
            />
          ) : null)}
        </SimpleGrid>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
