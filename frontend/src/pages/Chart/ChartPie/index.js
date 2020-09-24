import React, { useEffect, useState } from 'react';
import ColorScheme from 'color-scheme';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { Pie } from 'react-chartjs-2';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import styles from './chartpie.module.scss'

const ChartPie = () => {
  const [chartDataPie, setChartDataPie] = useState({});
  const dynamicColors = function () {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  };
  const expenditures = useSelector(state =>
    state.categories.filter(category => category.value === 'expenditure')
  );
  const stores = useSelector(state =>
    state.categories.filter(category => category.value === 'store')
  );
  const transactions = useSelector(state =>
    state.transactions.filter(transaction => transaction.value === 'loss')
  );
  const transactionsNormalized = transactions.map(transaction => {
    return {
      amount: transaction.amount,
      from: stores.filter(store => {
        return store.id === transaction.from;
      })[0].name,
      to: expenditures.filter(expenditure => {
        return expenditure.id === transaction.to;
      })[0].name,
    };
  });
  let stackedObject = {};
  let stackedObjectInsideOut = {};
  stores.map(store => {
    stackedObject[store.name] = {};
    expenditures.map(expenditure => {
      stackedObject[store.name][expenditure.name] = 0;
    });
  });
  expenditures.map(expenditure => {
    stackedObjectInsideOut[expenditure.name] = {};
    stores.map(store => {
      stackedObjectInsideOut[expenditure.name][store.name] = 0;
    });
  });
  Object.keys(stackedObject).map(storeName => {
    Object.keys(stackedObject[storeName]).map(expenditureName => {
      transactionsNormalized.map(transaction => {
        if (
          transaction.from === storeName &&
          transaction.to === expenditureName
        ) {
          stackedObject[storeName][expenditureName] += transaction.amount;
        }
      });
    });
  });
  let scm = new ColorScheme();
  scm
    .from_hue(21)
    .scheme('contrast')
    .distance(0.1)
    .add_complement(false)
    .variation('pastel')
    .web_safe(false);
  const colors = _.shuffle(scm.colors());
  console.log(colors);
  console.log('Stacked Object', stackedObject);
  Object.keys(stackedObject).map(storeName => {
    Object.keys(stackedObject[storeName]).map(expenditureName => {
      stackedObjectInsideOut[expenditureName][storeName] =
        stackedObject[storeName][expenditureName];
    });
  });
  console.log('Stacked Object inside out', stackedObjectInsideOut);
  console.log(Object.keys(stackedObject).map(element => element));


  const chart = () => {
    const names = expenditures.map(expenditure => expenditure.name);
    const values = expenditures.map(expenditure => expenditure.currentNumber);
    const index = expenditures.length;
    setChartDataPie({
      labels: names,
      datasets: [
        {
          label: 'expenditures',
          data: values,
          backgroundColor: new Array(index)
            .fill()
            .map(color => dynamicColors()),
          borderWidth: 0.5,
        },
      ],
    });
  };

  useEffect(() => {
    chart();
  }, []);
  console.log(expenditures);
  return (
    <div>
      <div
        className={styles.card}
      >
        <motion.div
          className={styles.image}
        >
      <Link to={'/chart'} style={{ textDecoration: 'none', color: '#333333', alignSelf: "flex-start", marginLeft: "2rem", marginTop: '2rem'}}>
        <motion.i
          whileTap={{ scale: 0.8 }}
          className="fas fa-arrow-left"
          style={{
            left: 0
          }}
        />
      </Link>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <h3 style={{ marginBottom: '30px' }}>Диаграмма расходов</h3>
        <div
          style={{
            width: '50rem',
          }}
          className={styles.card}
        >
          <Pie data={chartDataPie} />
        </div>
      </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ChartPie;
