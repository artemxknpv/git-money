import React from 'react';
import Fade from 'react-reveal/Fade';
import { useDispatch, useSelector } from 'react-redux';
import Expenses from '../../components/DarkExpenses';
import Greetings from '../../components/Greetings';
import Header from '../../components/Header';
import Income from '../../components/Income';
import LoadingPage from '../../components/LoadingPage';
import ModalWindowAddMoney from '../../components/ModalWindowAddMoney';
import ModalWindowAddCategory from '../../components/ModalWindowAddCategory';
import ModalWindowTransferMoney from '../../components/modalWindowTransferMoney';
import ModalWindowTransactionHistoryExpenses from '../../components/TransactionsHistory/index';
import Navbar from '../../components/Navbar';
import openModalTransferMoney from '../../redux/actions/modalWindow/openModalWindowTransferMoney';
import styles from './darkmainpage.module.scss';
import { DragDropContext } from 'react-beautiful-dnd';
import darkThemeFalse from "../../redux/actions/darkTheme/darkThemeFalse";
import darkThemeTrue from "../../redux/actions/darkTheme/darkThemeTrue";

const MainPage = () => {
  const dispatch = useDispatch();
  const isModal = useSelector(state => state.isModal.isOpened);
  const isModalCategory = useSelector(state => state.isCategoryModal.isOpened);
  const isModalTransfer = useSelector(
    state => state.isTransferMoneyModal.isOpened
  );
  const userName = useSelector(state => state.user.firstName);
  const isModalHistoryTransaction = useSelector(
    state => state.isTransactionHistoryModal.isOpened
  );
  const categories = useSelector(state => state.categories);
  const isLoaded = useSelector(state => state.user.loaded);

  return !isLoaded ? (
    <LoadingPage loading={true} />
  ) : (
    <Fade bottom>
      <div className={styles.batya}>
        <button
          onClick={()=>dispatch(darkThemeTrue())}
        >dark true</button>
        <button
          onClick={()=>dispatch(darkThemeFalse())}
        >dark true</button>
        <Navbar />
        <ModalWindowAddMoney show={isModal} />
        <ModalWindowAddCategory show={isModalCategory} />
        <ModalWindowTransferMoney show={isModalTransfer} />
        <ModalWindowTransactionHistoryExpenses
          show={isModalHistoryTransaction}
        />
        <Header title={'Управление'} />
        <DragDropContext
          onDragEnd={result => {
            const storeId = result.draggableId;
            const expenseId = result.destination.droppableId;
            let catStore = categories.filter(
              element => element.id === storeId
            )[0];
            let catExp = categories.filter(
              element => element.id === expenseId
            )[0];
            if (catExp && catStore) {
              dispatch(openModalTransferMoney(expenseId, storeId));
            } else {
              console.log('Fail');
            }
          }}
        >
          <Income />
          <Expenses />
        </DragDropContext>
      </div>
    </Fade>
  );
};

export default MainPage;
