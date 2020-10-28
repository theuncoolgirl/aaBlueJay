import React, { useEffect, useState } from 'react';
import { thunks } from '../store/list';
import { useDispatch, useSelector } from 'react-redux'
import AddListItem from './AddListItem'

const DisplayLists = () => {
  const userId = useSelector((state) => state.session.id)
  const dispatch = useDispatch()
  const userLists = useSelector(state => state.list.lists)

  useEffect(() => {
    dispatch(thunks.getAllUserLists(userId));
  }, [userId]);
  console.log(userLists)
  return (
    <>
      {userLists.map(list => <div>{list[0]} <AddListItem listTitle={list[0]} listId={list[1]} /></div>)}
    </>
  )
}

export default DisplayLists
