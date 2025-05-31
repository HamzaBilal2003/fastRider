import React from 'react';
import { MetricBox } from './MetricBox';
import images from '../../../constants/images';

export const handleMetricClick  = (id: string) => {
  console.log(`Metric clicked: ${id}`);
  // Add your click handling logic here
};
interface props {
  heading: string;
  data: any[]; 
}

export const BoxContainer: React.FC<props> = ({heading , data}) => {
  return (
    <div className=" bg-white rounded-md overflow-hidden shadow-md shadow-gray-400">
      <h1 className="text-xl flex items-center gap-2 font-bold text-gray-900 bg-gray-100 p-6">
        <img src={images.signal} alt="icon" className='size[20px]' />
        {heading}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-8">
        {data.map((box) => (
          <MetricBox
            key={box.id}
            data={box}
            onClick={handleMetricClick}
          />
        ))}
      </div>
    </div>
  );
};