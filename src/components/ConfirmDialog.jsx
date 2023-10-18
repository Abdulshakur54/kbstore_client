import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function ConfirmDialog({open, setOpen,confirm, decline = ()=>{setOpen(false)}}) {

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Confirmation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Do you want to proceed ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
         
          <Button onClick={confirm}>Yes</Button>
          <Button onClick={decline}>No</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}