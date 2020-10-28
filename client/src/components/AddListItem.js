import React from "react";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { thunks } from '../store/list'

const AddListItem = ({ listTitle, listId }) => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.session.id);
  const coinSymbol = useSelector(state => state.coin.symbol)
  //   const { coinId } = useParams()

  const handleAdd = (e) => {
    dispatch(thunks.addWatchlistItem(coinSymbol, listId))
  }

  if (!userId) {
    return null;
  }

  return (
    <span>
      <button onClick={handleAdd}>{`Add to ${listTitle}`}</button>
    </span>
  );
}

export default AddListItem
