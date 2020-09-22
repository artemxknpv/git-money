import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';

const Chart = () => {
  const [chartDataPie, setChartDataPie] = useState({});
  const [stackData, setStackData] = useState({});
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
  console.log('Stacked Object', stackedObject);
  Object.keys(stackedObject).map(storeName => {
    Object.keys(stackedObject[storeName]).map(expenditureName => {
      stackedObjectInsideOut[expenditureName][storeName] =
        stackedObject[storeName][expenditureName];
    });
  });
  console.log('Stacked Object inside out', stackedObjectInsideOut);
  console.log(Object.keys(stackedObject).map(element => element));
  const StackData = () => {
    setStackData({
      labels: Object.keys(stackedObject).map(element => element),
      datasets: Object.keys(stackedObjectInsideOut).map(expenditureName => {
        return {
          label: expenditureName,
          data: Object.keys(stackedObjectInsideOut[expenditureName]).map(
            storeName => {
              return stackedObjectInsideOut[expenditureName][storeName];
            }
          ),
        };
      }),
    });
  };
  const chartPie = () => {
    const names = expenditures.map(expenditure => expenditure.name);
    const values = expenditures.map(expenditure => expenditure.currentNumber);
    setChartDataPie({
      labels: names,
      datasets: [
        {
          label: 'expenditures',
          data: values,
          backgroundColor: [
            `rgba(255, 99, 132, 1)`,
            `rgba(54, 162, 235, 1)`,
            `rgba(255, 206, 86, 1)`,
            `rgba(75, 192, 192, 1)`,
            `rgba(153, 102, 255, 1)`,
          ],
          borderWidth: 4,
        },
      ],
    });
  };

  useEffect(() => {
    chartPie();
    StackData();
  }, []);
  console.log(expenditures);
  return (
    <>
      <div>
        <h3>The pie Chart</h3>
        <div style={{ width: '800px', height: '800px' }}>
          <Pie data={chartDataPie} />
        </div>
      </div>
      <div>
        <h3>The stacked Chart</h3>
        <div style={{ width: '800px', height: '800px' }}>
          <Bar data={stackData} />
        </div>
      </div>
    </>
  );
};

export default Chart;
