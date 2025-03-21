
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PointDistributionChart = ({ users }) => {
  // Prepare data for the chart
  const data = {
    labels: users.map((user) => user.name),
    datasets: [
      {
        label: 'Points',
        data: users.map((user) => user.points),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Point Distribution Among Users',
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default PointDistributionChart;