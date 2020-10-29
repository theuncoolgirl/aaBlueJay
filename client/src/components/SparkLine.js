import React from 'react';
import { useSelector } from 'react-redux';
import { Sparklines, SparklinesLine, SparklinesSpots, SparklinesBars } from 'react-sparklines';

export const Spark = () => {
  const myList = useSelector(state => state.list.watchlist)
  const stocks = myList ? myList : []
  const sampleData = [5, 10, 5, 20, 8, 15]
  const plotData = (stockData) => {
    return [stockData.low_24h, stockData.current_price, stockData.high_24h]
  }
  // debugger
  return (
    <div>
      {stocks.map((stock) => (
        <Sparklines data={plotData(stock)}>
          <SparklinesLine style={{ fill: "none" }} />
          {/* <SparklinesSpots /> */}
          <SparklinesBars />
        </Sparklines>
      ))}
    </div>
  )
}
