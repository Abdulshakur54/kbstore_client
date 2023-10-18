import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';
export default function Message({ show, setShow, error, message }) {
  useEffect(() => {
    const timeoutHandler = setTimeout(() => { setShow(false) }, 5000)
    return ()=>{
      clearTimeout(timeoutHandler)
    }
  }, [show])
  if (!show) return ''
  if (!error && !message) {
    return ''
  }
  
  return (
    <Collapse in={show}>
      <Alert
        severity={error ? "error" : "success"}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setShow(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        {error ? error.message : message}
      </Alert>
    </Collapse>
  )
}