import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { colors } from '../defaults';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function ErrorDialog({open, setOpen, errorMessage}) {

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={()=>{setOpen(false)}}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{color: colors.red}}>{"Error"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           {errorMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{setOpen(false)}}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}