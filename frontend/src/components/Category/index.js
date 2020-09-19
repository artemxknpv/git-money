import React, { useState } from 'react';
import ItemType from '../../';
import { useDispatch, useSelector } from 'react-redux';
import FoodIcon from '../../img/Food.jsx';
import WalletFilledIcon from '../../img/WalletFilledIcon.jsx';
import deleteCategoryStarted from '../../redux/actions/deleteCategory/deleteCategoryStarted';
// <<<<<<< scss-layout
import openModalWindow from '../../redux/actions/modalWindow/openModalWindowAddMoney.js';
import styles from './Category.module.scss';
import addMoneyStarted from '../../redux/actions/addMoney/addMoneyStarted';

const Category = ({ value, id }) => {
  const [add, setAdd] = useState('');
  const userId = useSelector(state => state.user._id);
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

      {/* //   const useStyles = makeStyles(theme => ({ */}
    </div>
  );
};

export default Category;

//   return (
//     <div className={styles.item}>
//       <Avatar className={style}>{category.currentNumber}</Avatar>
//       <p>{category.name}</p>
//       <button
//         type="button"
//         onClick={() => {
//           dispatch(deleteCategoryStarted(userId, category.id));
//         }}
//       >
//         Delete
//       </button>
//       {value === 'store' ? (
//         <>
//           <button
//             type="button"
//             onClick={() => {
//               dispatch(addMoneyStarted(userId, category.id, add));
//               setAdd('');
//             }}
//           >
//             add
//           </button>
//           <input
//             type="text"
//             onChange={event => setAdd(Number(event.target.value))}
//             value={add}
//           ></input>
//         </>
//       ) : (
//         <>
//           <button type="button">trans</button>
//           <input type="text"></input>
//         </>
//       )}
// >>>>>>> develop
