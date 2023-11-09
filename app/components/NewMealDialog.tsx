import React from 'react';
import {
  Button,
  Dialog, DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

interface NewMealDialogProps {
  fullScreen: boolean;
  handleDelete: () => void;
  handleSave: () => void;
  mealUpdate: MealUpdate;
  open: boolean;
}

const newMealDialog = ({open, fullScreen, handleDelete, handleSave}: NewMealDialogProps) => (
    <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleDelete}
        aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {"Use Google's location service?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleDelete}>
          Delete
        </Button>
        <Button onClick={handleSave} autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>);
export default newMealDialog;