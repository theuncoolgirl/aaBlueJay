import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
// import AddListItem from './AddListItem';
import { useSelector, useDispatch } from 'react-redux';
// import DisplayLists from './DisplayLists'
import { Button } from '@material-ui/core';
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
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal() {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const userLists = useSelector(state => state.list.lists)
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
    // console.log(inputVal)
    dispatch(thunks.createNewList(userId, inputVal))
    handleClose()
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h4 id="simple-modal-title">What do you want to name your list?</h4>
      <input type="text" placeholder="List Name" value={inputVal} onChange={e => setInputVal(e.target.value)} />
      <Button variant="outlined" color="primary" style={{ margin: 20 }} onClick={handleCreate}>
        &#10003; Create List
     </Button>
    </div>
  );

  return (
    <div>
      <Button variant="outlined" color="primary" style={{ margin: 20 }} onClick={handleOpen}>
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
