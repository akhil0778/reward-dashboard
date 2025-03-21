import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const RewardRedemptionsChart = ({ rewards }) => {
  // Prepare data for the chart
  const data = {
    labels: rewards.map((reward) => reward.name),
    datasets: [
      {
        label: 'Redemptions',
        data: rewards.map((reward) => reward.points), // Use points or another metric
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(55, 206, 86, 0.6)',
          'rgba(57, 06, 86, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(55, 206, 86, 1)',
          'rgba(57, 06, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Reward Redemptions',
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default RewardRedemptionsChart;