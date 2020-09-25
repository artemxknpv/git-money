import React, { useEffect, useState } from 'react';
import ColorScheme from 'color-scheme';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import Fade from 'react-reveal/Fade.js';
import styles from './chart.module.scss';
import { motion } from 'framer-motion';
import SidebarForChart from './NavbarForCategory';
import { useHistory } from 'react-router-dom';

const Chart = () => {
  const [chartDataPie, setChartDataPie] = useState({});
  const [stackData, setStackData] = useState({});
  const [stackDataInsideOut, setstackDataInsideOut] = useState({});
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
  Object.keys(stackedObject).map(storeName => {
    Object.keys(stackedObject[storeName]).map(expenditureName => {
      stackedObjectInsideOut[expenditureName][storeName] =
        stackedObject[storeName][expenditureName];
    });
  });
  const optionsStacked = {
    scales: {
      yAxes: [
        {
          stacked: true,
          display: false,
        },
      ],
      xAxes: [
        {
          stacked: true,
          display: false,
        },
      ],
    },
    legend: { display: false },
    tooltips: {
      callbacks: {
        label: function (tooltipItem) {
          return tooltipItem.yLabel;
        },
      },
    },
  };

  const StackData = () => {
    setStackData({
      labels: Object.keys(stackedObjectInsideOut).map(element => element),
      datasets: Object.keys(stackedObject).map((expenditureName, index) => {
        return {
          // label: expenditureName,
          backgroundColor: '#' + colors[index],
          data: Object.keys(stackedObject[expenditureName]).map(storeName => {
            return stackedObject[expenditureName][storeName];
          }),
        };
      }),
    });
  };

  const StackDataInsideOut = () => {
    setstackDataInsideOut({
      labels: Object.keys(stackedObject).map(element => element),
      datasets: Object.keys(stackedObjectInsideOut).map((storeName, index) => {
        return {
          // label: storeName,
          backgroundColor: '#' + colors[index],
          data: Object.keys(stackedObjectInsideOut[storeName]).map(
            expenditureName => {
              return stackedObjectInsideOut[storeName][expenditureName];
            }
          ),
        };
      }),
    });
  };
  let history = useHistory();
  const chartPie = () => {
    const names = expenditures.map(expenditure => expenditure.name);
    const values = expenditures.map(expenditure => expenditure.currentNumber);
    const index = expenditures.length;
    setChartDataPie({
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
    chartPie();
    StackData();
    StackDataInsideOut();
  }, []);
  return (
    <div className={styles.batya}>
      <SidebarForChart />
      <Fade bottom cascade>
        <motion.div className={styles.mainContainer}>
          <div className={styles.card}>
            <motion.div
              className={styles.image}
              whileTap={{ scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => {
                history.push('/chart/pie');
              }}
            >
              <h3 className={styles.categorySubheader}>Диаграмма расходов</h3>
              <Pie data={chartDataPie} />
            </motion.div>
          </div>
          <div className={styles.card}>
            <motion.div
              className={styles.image}
              whileTap={{ scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => {
                history.push('/chart/stackdata');
              }}
            >
              <h3 className={styles.categorySubheader}>
                Траты по категориям расходов
              </h3>
              <Bar data={stackData} options={optionsStacked} />
            </motion.div>
          </div>
          <div className={styles.card}>
            <motion.div
              className={styles.image}
              whileTap={{ scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => {
                history.push('/chart/stackdatainsideout');
              }}
            >
              <h3 className={styles.categorySubheader}>
                Траты по категориям доходов
              </h3>
              <Bar data={stackDataInsideOut} options={optionsStacked} />
            </motion.div>
          </div>
        </motion.div>
      </Fade>
    </div>
  );
};

export default Chart;
