import React from 'react';
import PlusIcon from '../../img/PlusIcon.js';
import styles from './AddCategory.module.scss';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import modalWindowCategoryOpened from '../../redux/actions/modalWindow/openModalWindowAddCategory';

const AddCategory = ({ value }) => {
  const dispatch = useDispatch();
  return (
    <motion.div whileHover={{ scale: 1.1 }} className={styles.card}>
      <div
        className={styles.image}
        onClick={() => {
          dispatch(modalWindowCategoryOpened(value));
        }}
      >
        <PlusIcon />
      </div>
      <p className={styles.categorySubheader}>Создать категорию</p>
    </motion.div>
  );
};

export default AddCategory;
