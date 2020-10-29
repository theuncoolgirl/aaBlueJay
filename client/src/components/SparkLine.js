import React from 'react';
import { useSelector } from 'react-redux';
import { Sparklines, SparklinesLine, SparklinesSpots, SparklinesBars } from 'react-sparklines';

export const Spark = ({ data }) => {
  return (
    <>
      <Sparklines data={data}>
        <SparklinesLine style={{ fill: "none" }} />
        {/* <SparklinesSpots /> */}
        <SparklinesBars />
      </Sparklines>
    </>
  )
}
