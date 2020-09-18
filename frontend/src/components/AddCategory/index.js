import React, { useState } from 'react';
import styles from './AddCategory.module.css';
import { useDispatch } from 'react-redux';
import addCategoryStarted from '../../redux/actions/addCategory/addCategoryStarted';
//Material UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const AddCategory = ({ value }) => {
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState('');
  // const style = styles.coin + ' ' + styles[value];
  const useStyles = makeStyles(theme => ({
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }));
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = event => {
    setName(event.target.value);
  };

  const handleCreateCategory = () => {
    dispatch(addCategoryStarted(name, value));
    setName('');
  };

  return (
    <div className={styles.add_item}>
      <Avatar onClick={handleClickOpen} className={classes.large}>
        +
      </Avatar>
      {/*<div onClick={handleClickOpen} className={styles.coin}>*/}
      {/*  +*/}
      {/*</div>*/}
      <p>Создать категорию</p>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Создать категорию</DialogTitle>
        <DialogContent>
          {/*<DialogContentText>Введите название категории</DialogContentText>*/}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Название"
            fullWidth
            onChange={handleChange}
            value={name}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Отменить
          </Button>
          <Button onClick={handleCreateCategory} color="primary">
            Создать
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddCategory;
