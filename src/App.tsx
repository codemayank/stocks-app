import React, { useEffect, useReducer, useState } from 'react';
import './App.css';
import useWebSocket from 'react-use-websocket';
import {ChakraProvider, Flex, Box, CSSReset, Heading, Spacer, SimpleGrid, Skeleton} from '@chakra-ui/core';
import { ColorModeSwitch } from './Components/ColorModeSwitch';

import CustomTheme from './theme'
import StockStat from './Components/StockStat';
import stockDataReducer from './reducers/stockDataReducer';
import { webSocketUrl } from './config/constants';

function App() {
  
  const [messageHistory, dispatch] = useReducer(stockDataReducer, null)
  const [tickCounter, setTicker] = useState<number>(0)
  const {lastMessage} = useWebSocket(webSocketUrl)

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

  let stockData: any[] = [];
  
  messageHistory?.forEach((value: TickerData, key: string) => {
    let id = key.split("").reduce((id , char) => id + char.charCodeAt(0), 0)
    let ticker = {
      ticker: key,
      value: value,
      id  
    }
    stockData.push(ticker);
  })

  stockData.sort((a, b) => a.id - b.id);

  
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
          {stockData.map(({ ticker, value }) => (
            <StockStat
              name={ticker}
              price={value.price}
              priceChange={value.priceChange}
              priceChangePercent={value.priceChangePercent}
            />
          ))}
        </SimpleGrid>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
