import React from 'react';
import ExpenseList from './pages/ExpenseList';
import PrivateRoute from './components/PrivateRoute';
import Authentication from './pages/Authentication';
import Index from './pages/IncomeList';
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
          <Index />
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
