import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Typography, TextField } from '@material-ui/core';
import { thunks } from '../store/list';
// import useStyles from '../styles.js';

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
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: 'center'
  },
  inputField: {
    marginTop: 20,
    width: 200
}
}));

export default function SimpleModal() {
  const classes = useStyles();
  const dispatch = useDispatch();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [inputVal, setInputVal] = React.useState("")
  const userId = useSelector((state) => state.session.id)

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = (e) => {
    dispatch(thunks.createNewList(userId, inputVal))
    handleClose()
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Typography variant="h5" id="simple-modal-title">What do you want to name your list?</Typography>

      {/* <input  className={classes.inputField} type="text" placeholder="List Name" value={inputVal} onChange={e => setInputVal(e.target.value)} /> */}
      <TextField className={classes.inputField} label="List Name" variant="outlined" size="small" value={inputVal} onChange={e => setInputVal(e.target.value)} />

      <Button variant="outlined" color="primary" style={{ margin: 20, height: 40 }} onClick={handleCreate}>
        &#10003; Create List
     </Button>
    </div>
  );

  return (
    <div style={{display: 'flex'}}>
      <Button variant="outlined" color="primary" style={{ marginTop: 20, marginBottom: 20, marginLeft: 'auto', marginRight: 'auto' }} onClick={handleOpen}>
        &#10003; Create List
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
