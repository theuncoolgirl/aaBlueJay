import React from 'react'
import useDimensions from 'react-use-dimensions'
import Chart from './Chart'
import { useStyles } from '../../styles.js';

//wrapper is needed to resize (add dimensions) to the chart
function ChartWrapper(props) {
  const classes = useStyles();
  const [ref, { width, height }] = useDimensions()
  return (
    <div ref={ref} className={classes.full}>
      <Chart
        {...props}
        height={height}
        width={width}
      />
    </div>
  )
}

export default ChartWrapper