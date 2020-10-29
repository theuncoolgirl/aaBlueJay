import React, { useEffect } from 'react';
import { thunks } from '../store/list';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import AddListItem from './AddListItem';
import { Button, Divider, Grid, Paper, Typography } from '@material-ui/core';
import ListModal from './ListModal';

const DisplayLists = () => {
  const userId = useSelector((state) => state.session.id)
  const dispatch = useDispatch()
  const userLists = useSelector(state => state.list.lists)
  const history = useHistory()
  const { listName } = useParams()

  // useEffect(() => {
  //   // dispatch(thunks.getAllUserLists(userId));
  //   dispatch(thunks.getUserWatchlist(userId, listName));
  // }, [userId, listName]);

  const handleClick = (e) => {
    e.preventDefault()
    // console.log(e.target.id)
    history.push(`/list/${e.target.id}`)
  }

  const handleCreate = (e) => {
    e.preventDefault()
    // return <ListModal />
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
        {/* <Button variant="outlined" color="primary" style={{ margin: 20 }} onClick={handleCreate} >
          &#10003; Create List
        </Button> */}
        <ListModal />
      </Paper>
    </>
    // <>
    //   {/* {userLists.map(list => <div>{list[0]}</div>)} */}
    // </>
  )
}

export default DisplayLists
