import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { green, amber } from '@material-ui/core/colors';
import { useDispatch, useSelector } from 'react-redux';
import FoodIcon from '../../img/Food.jsx';
import WalletFilledIcon from '../../img/WalletFilledIcon.jsx';
import deleteCategoryStarted from '../../redux/actions/deleteCategory/deleteCategoryStarted';
import openModalWindow from '../../redux/actions/modalWindow/openModalWindowAddMoney.js';
import styles from './Category.module.scss';

const Category = ({ value, id }) => {
  const dispatch = useDispatch();
  const category = useSelector(state =>
    state.categories.filter(category => category.id === id)
  )[0];

  return (
    <div className={styles.card}>
      <div
        className={styles.image}
        onClick={
          value === 'store' ? () => dispatch(openModalWindow(id)) : () => {}
        }
      >
        <WalletFilledIcon />
      </div>
      <p className={styles.categorySubheader} style={{ fontWeight: '500' }}>
        {category.name}
      </p>
      <p className={styles.categorySubheader}>{category.currentNumber} $</p>
      {/*<button*/}
      {/*  type="button"*/}
      {/*  onClick={() => {*/}
      {/*    dispatch(deleteCategoryStarted(category.id));*/}
      {/*  }}*/}
      {/*>*/}
      {/*  Delete*/}
      {/*</button>*/}
    </div>
  );
};

export default Category;
