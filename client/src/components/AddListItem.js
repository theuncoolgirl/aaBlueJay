import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { useStyles } from '../styles.js';
import { thunks } from '../store/list'

const AddListItem = ({ listTitle, listId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userId = useSelector(state => state.session.id);
  const coinSymbol = useSelector(state => state.coin.symbol)

  const handleAdd = (e) => {
    dispatch(thunks.addWatchlistItem(coinSymbol, listId))
  }

  if (!userId) {
    return null;
  }

  return (
    <Button className={classes.listButton} variant="outlined" color="primary" size="small" onClick={handleAdd}>
      {`Add to ${listTitle}`}
    </Button>
  );
}

export default AddListItem
