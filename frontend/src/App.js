import React from 'react';
import ExpenseList from './components/ExpenseList/ExpenseList.js';
import PrivateRoute from './components/PrivateRoute';
import Authentication from './pages/Authentication';
import IncomeList from './pages/IncomeList.js';
import MainPage from './pages/MainPage/index';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/">
          <MainPage />
        </PrivateRoute>
        <Route exact path="/income/:cat">
          <IncomeList />
        </Route>
        <Route exact path="/expense/:cat">
          <ExpenseList />
        </Route>
        <Route exact path="/login">
          <Authentication mode={'login'} />
        </Route>
        <Route exact path="/registration">
          <Authentication mode={'registration'} />
        </Route>
        <div>
          <MainPage />
        </div>
      </Switch>
    </Router>
  );
}

export default App;
