import React, { FC } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface PublishAlertProps {
  isOpen: boolean;
  close: Function;
  publish: any;
}

const PublishAlert: FC<PublishAlertProps> = ({ isOpen, close, publish }) => (
  <Dialog
    open={isOpen}
    onClose={() => close()}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      Are you sure you want to publish?
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Reminder: Once a question is published it cannot be edited.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => close()}>Cancel</Button>
      <Button onClick={publish} autoFocus>
        Publish Now
      </Button>
    </DialogActions>
  </Dialog>
)

export default PublishAlert
