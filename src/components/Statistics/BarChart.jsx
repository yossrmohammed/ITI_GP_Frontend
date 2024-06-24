// src/components/BarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import TitleCard from './TitleCard'; // Adjust the path based on your project structure

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data, title }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <TitleCard title={title}>
      <Bar options={options} data={data} />
    </TitleCard>
  );
};

export default BarChart;
