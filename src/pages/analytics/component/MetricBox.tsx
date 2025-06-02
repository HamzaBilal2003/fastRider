import React from 'react';
import type { BoxData } from '../../../constants/statisticsData';
import { formatAmount } from '../../../constants/help';

interface MetricBoxProps {
  data: any;
  onClick?: (id: string) => void;
}

export const MetricBox: React.FC<MetricBoxProps> = ({ data, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
      onClick={() => onClick?.(data.id)}
    >
      <h3 className="text-lg font-medium text-gray-700">{data.name}</h3>
      {/* <p className="text-sm text-gray-500 mb-4">{data.description}</p> */}
      <p className="text-2xl font-bold text-purple-700 mb-2">{typeof(data.value) == 'string' ?  formatAmount(data.value) : data.value}</p>
    </div>
  );
};