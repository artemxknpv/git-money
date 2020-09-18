// import React, { useState } from 'react';
// <<<<<<< scss-layout
// import styles from './AddCategory.module.scss';
// import { useDispatch } from 'react-redux';

// const AddCategory = ({ type }) => {
// =======
// import styles from './AddCategory.module.css';
// import { useDispatch, useSelector } from 'react-redux';
// import addCategoryStarted from '../../redux/actions/addCategory/addCategoryStarted';
// //Material UI
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Avatar from '@material-ui/core/Avatar';
// import { makeStyles } from '@material-ui/core/styles';

// const AddCategory = ({ value }) => {
//   const dispatch = useDispatch();
//   const userId = useSelector(state => state.user._id);
//   const [open, setOpen] = React.useState(false);
//   const [name, setName] = useState('');
//   // const style = styles.coin + ' ' + styles[value];
//   const useStyles = makeStyles(theme => ({
//     large: {
//       width: theme.spacing(7),
//       height: theme.spacing(7),
//     },
//   }));
//   const classes = useStyles();

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleChange = event => {
//     setName(event.target.value);
//   };

//   const handleCreateCategory = () => {
//     dispatch(addCategoryStarted(userId, name, value));
//     setName('');
//   };

//   return (
//     <div className={styles.card}>
//       <div className={styles.image}>+</div>
//       <p className={styles.categorySubheader}>Создать категорию</p>
//     </div>
//   );
// };

// export default AddCategory;
