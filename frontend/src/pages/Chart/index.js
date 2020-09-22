import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Pie } from 'react-chartjs-2';

const Chart = () => {
  const [chartData, setChartData] = useState({});
  const expenditures = useSelector(state =>
    state.categories.filter(category => category.value === 'expenditure')
  );
  const chart = () => {
    const names = expenditures.map(expenditure => expenditure.name);
    const values = expenditures.map(expenditure => expenditure.currentNumber);
    setChartData({
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
    chart();
  }, []);
  console.log(expenditures);
  return (
    <div>
      how are you?
      <div>
        <Pie data={chartData} />
      </div>
    </div>
  );
};

export default Chart;
