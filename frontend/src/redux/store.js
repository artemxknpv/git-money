import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/rootReducer.js';
import rootSaga from './sagas/rootSaga.js';

const sagaMiddleware = createSagaMiddleware();
const initialState = window.localStorage.getItem('redux') ?? '{}';

const store = createStore(
  rootReducer,
  JSON.parse(initialState),
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
