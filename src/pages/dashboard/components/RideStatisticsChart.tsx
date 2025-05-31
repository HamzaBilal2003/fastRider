import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const RideStatisticsChart: React.FC = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    cutout: '60%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context: any) => {
            return `${context.label}: ${context.parsed}%`;
          },
        },
      },
    },
  };

  const data = {
    labels: ['Completed Rides', 'Active Rides', 'Scheduled Rides'],
    datasets: [
      {
        data: [25, 60, 15],
        backgroundColor: [
          '#dc2626', // red for completed
          '#16a34a', // green for active
          '#818cf8', // blue for scheduled
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="w-full h-fit flex flex-col items-center justify-center">
      <div className='lg:w-[60%]'>
        <Doughnut data={data} options={options} />
      </div>


      {/* Custom Legend */}
      <div className="mt-10 w-full">
        {/* Completed Rides - Left */}
        <div className="">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#dc2626] rounded"></div>
            <span className="text-gray-600">Completed Rides</span>
          </div>
        </div>

        {/* Active Rides - Right */}
        <div className="">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#16a34a] rounded"></div>
            <span className="text-gray-600">Active Rides</span>
          </div>
        </div>

        {/* Scheduled Rides - Top */}
        <div className="">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#818cf8] rounded"></div>
            <span className="text-gray-600">Scheduled Rides</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RideStatisticsChart;