import React from "react";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { thunks } from '../store/list'

const AddListItem = () => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.session.id);
  const { coinId } = useParams()

  const handleAdd = (e) => {
    dispatch(thunks.addWatchListItem(userId, coinId))
  }

  if (!userId) {
    return null;
  }

  return (
    <div>
      <button onClick={handleAdd}>Add to List</button>
    </div>
  );
}

export default AddListItem
