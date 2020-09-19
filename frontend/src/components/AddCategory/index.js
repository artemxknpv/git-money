import React, { useState } from 'react';
import styles from './AddCategory.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import addCategoryStarted from '../../redux/actions/addCategory/addCategoryStarted';
import modalWindowCategoryOpened from '../../redux/actions/modalWindow/openModalWindowAddCategory';

const AddCategory = ({ value }) => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.user._id);
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState('');

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
    dispatch(addCategoryStarted(userId, name, value));
    setName('');
  };

  return (
    <div className={styles.card}>
      <div
        className={styles.image}
        onClick={() => {
          dispatch(modalWindowCategoryOpened(value));
        }}
      >
        +
      </div>
      <p className={styles.categorySubheader}>Создать категорию</p>
    </div>
  );
};

export default AddCategory;
