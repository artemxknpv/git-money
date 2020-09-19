import React from 'react';
import PrivateRoute from './components/PrivateRoute';
import Authentication from './pages/Authentication';
import MainPage from './pages/MainPage/index';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/">
          <MainPage />
        </PrivateRoute>
        <Route exact path="/login">
          <Authentication mode={'login'} />
        </Route>
        <Route exact path="/register">
          <Authentication mode={'register'} />
        </Route>
        <div>
          <MainPage />
        </div>
      </Switch>
    </Router>
  );
}

export default App;
