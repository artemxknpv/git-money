import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import modalCrudOperationsClosed from '../../../redux/actions/modalWindow/closeModalWindowCrudCategory';
function ModalWindowCrudCategory({ show }) {
  const dispatch = useDispatch();
  const modalConfiguration = useSelector(state => state.isCrudModalWindow);
  const type = modalConfiguration.type;
  const subtype = modalConfiguration.subtype;
  // const id = modalConfiguration.id
  return show ? (
    <>
      <p>{type}</p>
      <p>{subtype}</p>
      <button
        onClick={() => {
          dispatch(modalCrudOperationsClosed());
        }}
      >
        Закрыть
      </button>
    </>
  ) : (
    <></>
  );
}

export default ModalWindowCrudCategory;
