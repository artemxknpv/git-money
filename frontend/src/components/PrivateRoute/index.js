import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
const PrivateRoute = ({ children, ...rest }) => {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  return (
    <Route {...rest}>
      {isAuthenticated ? children : <Redirect to="/login" />}
    </Route>
  );
};

export default PrivateRoute;
