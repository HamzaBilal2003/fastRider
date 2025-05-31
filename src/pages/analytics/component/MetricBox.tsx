import React from 'react';
import type { BoxData } from '../../../constants/statisticsData';

interface MetricBoxProps {
  data: BoxData;
  onClick?: (id: string) => void;
}

export const MetricBox: React.FC<MetricBoxProps> = ({ data, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
      onClick={() => onClick?.(data.id)}
    >
      <h3 className="text-lg font-medium text-gray-700">{data.title}</h3>
      <p className="text-sm text-gray-500 mb-4">{data.description}</p>
      <p className="text-4xl font-bold text-purple-700 mb-2">{data.value}</p>
    </div>
  );
};