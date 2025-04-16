import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Card, CardContent } from '../../components/ui/card';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const horas = [
  '00:00', '01:00', '02:00', '03:00', '04:00', '05:00',
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
];

// 🔧 Altere esses valores como quiser
const dadosTemperatura = [
  59, 61, 63, 64, 67, 68,
  70, 72, 74, 75, 76, 77,
  77, 77, 77, 77, 76, 75,
  74, 72, 71, 69, 68, 66
];

const data = {
  labels: horas,
  datasets: [
    {
      label: 'Temperatura (°C)',
      data: dadosTemperatura,
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: true,
      tension: 0.3,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      min: 40,
      max: 80,
      title: {
        display: true,
        text: 'Temperatura (°C)',
      },
    },
    x: {
      title: {
        display: true,
        text: 'Hora do Dia',
      },
    },
  },
};

const GraficoEstatico: React.FC = () => {
    return (      
          <Line options={options} data={data} />
    );
  };
  
  export default GraficoEstatico;