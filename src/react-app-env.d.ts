/// <reference types="react-scripts" />

interface TickerData {
  price: number;
  lastUpdateTime: ConfigType;
  priceChange?: PriceChange;
  priceChangePercent?: number;
  prevPrice?: number;
  
}

type StockData = Map<string, TickerData>;

interface StockDataDisplay {
  ticker: string;
  value: TickerData;
  id: number

}