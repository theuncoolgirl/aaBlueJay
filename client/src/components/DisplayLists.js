import React from 'react';
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import {  Divider, Paper, Typography } from '@material-ui/core';
import ListModal from './ListModal';

const DisplayLists = () => {
  const userLists = useSelector(state => state.list.lists)
  const history = useHistory()


  const handleClick = (e) => {
    e.preventDefault()
    // console.log(e.target.id)
    history.push(`/list/${e.target.id}`)
  }


  return (
    <>
      <Paper elevation={3} style={{ textAlign: 'center', padding: 10, maxWidth: 250 }}>
        <Typography variant="h5">Lists</Typography>
        <Divider style={{ marginTop: 10, marginBottom: 10, backgroundColor: "black" }} />
        <div style={{ height: 200 }}>
          <Typography variant="subtitle2">
            {userLists ? userLists.map(list => <div key={list[0]} id={list[0]} onClick={handleClick}>{list[0]}<Divider style={{ marginTop: 10, marginBottom: 10 }} /></div>) : null}
          </Typography>
        </div>
        <ListModal />
      </Paper>
    </>
  )
}

export default DisplayLists
