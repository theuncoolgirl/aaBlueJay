import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Divider, Modal, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddListItem from './AddListItem';
import { thunks } from '../store/list';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 350,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal() {
  const classes = useStyles();
  const dispatch = useDispatch();
  let userLists = useSelector(state => state.list.lists)
  const userId = useSelector(state => state.session.id)
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    if (userLists.length === 0) {
      console.log('ZERO LISTS')
      dispatch(thunks.createNewList(userId, 'Watch List'));
      userLists = thunks.getAllUserLists(userId);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Typography variant="h4" id="simple-modal-title">Lists</Typography>
      {userLists.map(list => <Typography key={`${list[0]}-${list[1]}`}>
        <Toolbar>
          {list[0]}
          <AddListItem listTitle={list[0]} listId={list[1]} />
        </Toolbar>
        <Divider style={{ marginTop: 10, marginBottom: 10 }} />
      </Typography>)}
    </div>
  );

  return (
    <div>
      <Button style={{ margin: 20 }} variant="outlined" color="primary" onClick={handleOpen}>
        &#10003; Add to list
     </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
