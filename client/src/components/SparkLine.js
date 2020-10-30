import React from 'react';
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';
import { useStyles } from '../styles.js';

export const Spark = ({ data }) => {
  const classes = useStyles();
  return (
    <>
      <Sparklines data={data}>
        <SparklinesLine className={classes.sparklinesLine} />
        <SparklinesSpots className={classes.sparklinesSpots} size={3} />
      </Sparklines>
    </>
  )
}
