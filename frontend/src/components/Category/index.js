import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { green, amber } from '@material-ui/core/colors';
import styles from './Category.module.css';

const Category = ({ type, name }) => {
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
      <Avatar className={style}>11</Avatar>
      {/*<div className={style}>0</div>*/}
      <p>{name}</p>
    </div>
  );
};

export default Category;
