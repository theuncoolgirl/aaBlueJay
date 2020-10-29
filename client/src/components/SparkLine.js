import React from 'react';
import { useSelector } from 'react-redux';
import { Sparklines, SparklinesLine, SparklinesSpots, SparklinesBars } from 'react-sparklines';

export const Spark = () => {
  const myList = useSelector(state => state.list.watchlist)
  const stocks = myList ? myList : []
  const sampleData = [5, 10, 5, 20, 8, 15]
  const plotData = (stockData) => {
    return [stockData.sparkline_in_7d.price]
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
