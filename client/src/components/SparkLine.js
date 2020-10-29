import React from 'react';
import { useSelector } from 'react-redux';
import { Sparklines, SparklinesLine, SparklinesSpots, SparklinesBars } from 'react-sparklines';

export const Spark = ({ data }) => {
  return (
    <>
      <Sparklines data={data}>
        <SparklinesLine style={{ strokeWidth: 2, stroke: "#336aff", fill: "green" }} />
        <SparklinesSpots size={3}
          style={{ stroke: "#336aff", strokeWidth: 2, fill: "white" }} />
      </Sparklines>
    </>
  )
}
