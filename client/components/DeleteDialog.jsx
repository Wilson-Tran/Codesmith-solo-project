import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const DeleteDialog = (props) => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseNo = () => {
    setOpen(false);
  };
  
  const handleCloseYes = () => {
    setOpen(false);
    fetch(('/api/patients/' + props.id), {
      method: 'DELETE', 
      headers: {
        'Content-type': 'Application/JSON'
      }
    })
      .then(res => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch(err => console.log('DeleteDialog fetch /patients/', props.id, ': ERROR: ', err));
      window.location.reload();
  };


  return (
    <div>
      <Button size="medium" className="deleteButton" variant="outlined" sx={{color: 'red', borderColor: 'red'}} onClick={handleClickOpen}>
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleCloseNo}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Delete this patient?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Clicking {'"Yes"'} will permanently remove this {'patient\'s'} info from the database.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNo}>No</Button>
          <Button onClick={handleCloseYes} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}; 

export default DeleteDialog;