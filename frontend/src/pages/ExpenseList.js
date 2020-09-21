import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ExpenseList = () => {
  const { cat } = useParams();
  return (
    <div>
      <h3>
        <Link to={'/'}>HOME</Link>
      </h3>
      <h1>Здарова ебать {cat}</h1>
    </div>
  );
};

export default ExpenseList;
