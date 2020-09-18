import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { green, amber } from '@material-ui/core/colors';
import { useDispatch, useSelector } from 'react-redux';
import deleteCategoryStarted from '../../redux/actions/deleteCategory/deleteCategoryStarted';
import styles from './Category.module.css';

const Category = ({ type, id }) => {
  const dispatch = useDispatch();
  const category = useSelector(state =>
    state.categories.filter(category => category.id === id)
  )[0];
  const useStyles = makeStyles(theme => ({
    green: {
      color: theme.palette.getContrastText(green['A200']),
      backgroundColor: green['A200'],
    },
    amber: {
      color: theme.palette.getContrastText(amber[500]),
      backgroundColor: amber[500],
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }));
  const classes = useStyles();
  const bgcolor = type === 'expenses' ? classes.green : classes.amber;
  const style = classes.large + ' ' + bgcolor;
  return (
    <div className={styles.item}>
      <Avatar className={style}>{category.currentNumber}</Avatar>
      <p>{category.name}</p>
      <button
        type="button"
        onClick={() => {
          dispatch(deleteCategoryStarted(category.id));
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default Category;
