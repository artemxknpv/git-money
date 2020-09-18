import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Expenses from '../../components/Expenses';
import Header from '../../components/Header';
import Income from '../../components/Income';
import ModalWindowAddMoney from '../../components/ModalWindowAddMoney';

import setUserInfoStarted from '../../redux/actions/setUserInfo/setUserInfoStarted';

const MainPage = () => {
  const isModal = useSelector(state => state.isModal.isOpened);
  const dispatch = useDispatch();
  const userId = useSelector(state => state.user._id);
  useEffect(() => {
    dispatch(setUserInfoStarted(userId));
  }, [dispatch, userId]);
  return (
    <div>
      <ModalWindowAddMoney show={isModal} />
      <Header title={'Управление'} />
      <Income />
      <hr style={{ marginRight: '16px', marginLeft: '16px', opacity: '20%' }} />
      <Expenses />
    </div>
  );
};

export default MainPage;
