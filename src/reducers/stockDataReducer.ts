import { formatMessageData, updateStockData } from "../utils/StockDataUtil";


function stockDataReducer(state: StockData | null, action: any ){
  switch (action.type) {
    case "update":
      let updatedStockData = updateStockData(formatMessageData(action.data), state);
      return updatedStockData ? new Map(updatedStockData) : state; 
    default:
      return state
  }
}

export default stockDataReducer