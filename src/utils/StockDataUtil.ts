import dayjs from 'dayjs';

enum PriceChange {
  Increase='increase',
  Decrease='decrease',
  NoChange='priceDefault'
}

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

export {formatMessageData, updateStockData}