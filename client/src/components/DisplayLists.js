import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { Divider, Paper, Typography } from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import ListModal from './ListModal';
import { useStyles } from '../styles.js';
import { thunks } from '../store/list'

const DisplayLists = () => {
  const classes = useStyles();
  const userLists = useSelector(state => state.list.lists);
  const id = useSelector(state=> state.session.id)
  const history = useHistory();
  const dispatch =useDispatch()

  const handleClick = (e) => {
    e.preventDefault();
    const test = escape(e.target.id)
    console.log(test)    // console.log(e.target.id)
    history.push(`/list/${test}`);
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    const listName = e.target.id.split("-")[1]
    console.log(listName)
    dispatch(thunks.deleteListThunk(id, listName))
  }

  return (
    <>
      <Paper className={classes.sideCard} style={{ overflowY: 'scroll' }} elevation={3}>
        <Typography variant="h5">Lists</Typography>
        <Divider style={{marginBottom: 0}} className={classes.divider} />
        <div className={classes.spacer}>
          <Typography variant="subtitle2">
            {userLists ? userLists.map(list => (
                                                <div key={list[0]}>
                                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}} className='list-div'  id={list[0]} onClick={handleClick}>
                                                  <span style={{marginLeft: '35%'}} id={list[0]}>{list[0]}</span>
                                                  <RemoveIcon onClick={handleDelete} style={{float:"right"}} id={`list-${list[0]}`} />
                                                  </div>
                                                    <Divider style={{margin: 0}} className={classes.divider} />
                                                </div>
                                               ))
                        : null}
          </Typography>
          <ListModal style={{ position: 'absolute', marginTop: "30" }} />
        </div>
      </Paper>
    </>
  )
}

export default DisplayLists
