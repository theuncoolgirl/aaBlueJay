import React from 'react';
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { Divider, Paper, Typography } from '@material-ui/core';
import ListModal from './ListModal';
import { useStyles } from '../styles.js';

const DisplayLists = () => {
  const classes = useStyles();
  const userLists = useSelector(state => state.list.lists);
  const history = useHistory();


  const handleClick = (e) => {
    e.preventDefault();
    history.push(`/list/${e.target.id}`);
  }


  return (
    <>
      <Paper className={classes.sideCard} elevation={3}>
        <Typography variant="h5">Lists</Typography>
        <Divider className={classes.divider} />
        <div className={classes.spacer}>
          <Typography variant="subtitle2">
            {userLists ? userLists.map(list => <div key={list[0]} id={list[0]} onClick={handleClick}>{list[0]}<Divider className={classes.divider} /></div>) : null}
          </Typography>
        </div>
        <ListModal />
      </Paper>
    </>
  )
}

export default DisplayLists
