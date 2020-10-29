import React from 'react'
import useDimensions from 'react-use-dimensions'
import Chart from './Chart'

//wrapper is needed to resize (add dimensions) to the chart
function ChartWrapper (props) {
  const [ref, { width, height }] = useDimensions()
  return (
    <div ref={ref} style={{ width: '100%', height: '100%' }}>
      <Chart
        {...props}
        height={height}
        width={width}
      />
    </div>
  )
}

export default ChartWrapper