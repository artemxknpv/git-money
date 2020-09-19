import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Expenses from '../../components/Expenses';
import Header from '../../components/Header';
import Income from '../../components/Income';
import ModalWindowAddMoney from '../../components/ModalWindowAddMoney';
import ModalWindowAddCategory from '../../components/ModalWindowAddCategory';
import ModalWindowTransferMoney from '../../components/modalWindowTransferMoney';

import setUserInfoStarted from '../../redux/actions/setUserInfo/setUserInfoStarted';
import openModalTransferMoney from '../../redux/actions/modalWindow/openModalWindowTransferMoney';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const MainPage = () => {
  const isModal = useSelector(state => state.isModal.isOpened);
  const isModalCategory = useSelector(state => state.isCategoryModal.isOpened);

  const isModalTransfer = useSelector(
    state => state.isTransferMoneyModal.isOpened
  );
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories);
  const userId = useSelector(state => state.user._id);
  // useEffect(() => {
  //   dispatch(setUserInfoStarted(userId));
  // }, [dispatch, userId]);

  // const dispatch = useDispatch();
  // const userId = useSelector(state => state.user._id);
  // useEffect(() => {
  //   dispatch(setUserInfoStarted(userId));
  // }, [dispatch, userId]);

  return (
    <div>
      {/* <DragDropContext onDropEnd={result => console.log(result)}> */}
      <ModalWindowAddMoney show={isModal} />
      <ModalWindowAddCategory show={isModalCategory} />
      <ModalWindowTransferMoney show={isModalTransfer} />
      <Header title={'Управление'} />
      <DragDropContext
        onDragEnd={result => {
          const storeId = result.draggableId;
          const expenseId = result.destination.droppableId;
          // console.log(result);
          // console.log('draggableId', storeId);
          // console.log('droppableId', expenseId);
          let catStore = categories.filter(
            element => element.id === storeId
          )[0];
          let catExp = categories.filter(
            element => element.id === expenseId
          )[0];
          if (catExp && catStore) {
            dispatch(openModalTransferMoney(expenseId, storeId));
          } else {
            console.log('FAIL');
          }
        }}
      >
        <Income />
        <hr
          style={{ marginRight: '16px', marginLeft: '16px', opacity: '20%' }}
        />
        <Expenses />
      </DragDropContext>
      {/* </DragDropContext> */}
    </div>
  );
};

export default MainPage;
