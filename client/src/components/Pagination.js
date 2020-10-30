import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { useStyles } from '../styles.js';

export default function PaginationRounded() {
  const classes = useStyles();

  return (
    <div className={classes.pagination}>
      <Pagination count={10} shape="rounded" />
    </div>
  );
}
