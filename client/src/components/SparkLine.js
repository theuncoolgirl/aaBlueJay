import React from 'react';
// import { useSelector } from 'react-redux';
import { Sparklines, SparklinesLine, SparklinesSpots, SparklinesReferenceLine } from 'react-sparklines';

export const Spark = ({ data }) => {
  const open7d = data[0];
  const close7d = data[data.length - 1];
  const sevenDColor = close7d > open7d ? "green" : "red";
  return (
    <>
      <Sparklines data={data}>
        <SparklinesLine style={{ strokeWidth: 2, stroke: sevenDColor, fill: "white" }} />
        <SparklinesSpots size={3}
          style={{ stroke: sevenDColor, strokeWidth: 2, fill: "white" }} />
        <SparklinesReferenceLine type="mean" />
      </Sparklines>
    </>
  )
}
