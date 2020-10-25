import React, { useEffect, useReducer, useState } from 'react';
import './App.css';
import useWebSocket, {ReadyState} from 'react-use-websocket';
import dayjs, { ConfigType } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import {ImArrowUp2, ImArrowDown2} from 'react-icons/im';

dayjs.extend(relativeTime)

enum PriceChange {
  Increase='price-increase',
  Decrease='price-decrease',
  NoChange='price-default'


}
interface TickerData {
  price: number;
  lastUpdateTime: ConfigType;
  priceChange?: PriceChange;
  priceChangePercent?: number;
  prevPrice?: number;
  
}

type StockData = Map<string, TickerData>

function formatMessageData(message: MessageEvent){
  
  let formattedData = JSON.parse(message.data).reduce((formattedData: StockData, dataPt: [string, number] ) => {
    let [ticker, price] = dataPt;
    let tickerData: TickerData = {
      price: Math.round(price * 100) / 100,
      lastUpdateTime: dayjs()
    }
    formattedData.set(ticker, tickerData);
    return formattedData
  }, new Map<string, TickerData>())
  return formattedData;
}

function updateStockData(updatedStockData: StockData | null, currentStockData: StockData | null){
  if(!currentStockData){
    return updatedStockData
  }else{
    updatedStockData?.forEach((value, key) => {
        if(currentStockData?.has(key)){
          let currentData = currentStockData.get(key) || {price: 0}
          let newData = updatedStockData.get(key) || {price: 0}
          let priceChange = newData.price - currentData.price
          let priceChangePercent = (priceChange / currentData.price) * 100;
          let newValue: any = {}
          newValue.priceChangePercent = Math.abs(Math.round(priceChangePercent * 100) / 100);
          newValue.price = newData.price;
          newValue.prevPrice = currentData.price;
          newValue = {...value, ...newValue}
          newValue.lastUpdateTime = dayjs()
          if(priceChange > 0){
            newValue.priceChange = PriceChange.Increase
          }else if(priceChange < 0){
            newValue.priceChange = PriceChange.Decrease
          }else{
            newValue.priceChange = PriceChange.NoChange
          }
          if(priceChange != 0){
            currentStockData.set(key, newValue);
          }
        }else{
          currentStockData.set(key, {...value, priceChange: PriceChange.NoChange, prevPrice: 0, priceChangePercent: 0})
        }
    })
  }
  
  return currentStockData;

}

function reducer(state: StockData | null, action: any ){
  switch (action.type) {
    case "update":
      let updatedStockData = updateStockData(formatMessageData(action.data), state);
      
      
      return updatedStockData ? new Map(updatedStockData) : state; 
    default:
      return state
  }
}

function App() {
  const webSocketUrl = "ws://stocks.mnet.website";
  const [messageHistory, dispatch] = useReducer(reducer, null)
  const [tickCounter, setTicker] = useState<number>(0)
  const {lastMessage} = useWebSocket(webSocketUrl)

  useEffect(() => {
    if(lastMessage){
      let action = {
        type: "update",
        data: lastMessage
      }
      setTicker(tickCounter + 1)
      dispatch(action);
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

  let currentTime = dayjs()
  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Price</th>
            <th>Change</th>
            
            <th>Last Update</th>
          </tr>
        </thead>
        <tbody>
          {stockData.map(({ ticker, value }) => (
            <tr
              key={ticker}
            >
              <td>{ticker}</td>
              <td className={value.priceChange}>{value.price}</td>
              {<td className={value.priceChange}>
                {`${value.priceChangePercent || 0}%`}
                {value.priceChange === PriceChange.Increase ? <ImArrowUp2 /> : <ImArrowDown2 />}
              </td>}
              
              {<td>{value.lastUpdateTime ? value.lastUpdateTime.from(currentTime) : '-'}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
