import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface RideStatisticsChartProps {
  data: any;
  labels: Array<{
    label: string;
    labelColor: string;
  }>;
}

const RideStatisticsChart: React.FC<RideStatisticsChartProps> = ({ data, labels }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<ChartJS | null>(null);
  console.log(data);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Always destroy the existing chart before creating a new one
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      chartRef.current = new ChartJS(ctx, {
        type: 'pie',
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
        } as ChartOptions<'pie'>,
      });
    } catch (error) {
      console.error('Error creating chart:', error);
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [data]);

  return (
    <div className="flex flex-col w-full">
      <div className="relative h-64">
        <canvas ref={canvasRef} />
      </div>
      
      {labels.length > 0 && (
        <div className="flex flex-col gap-2 mt-4">
          {labels.map((label, index) => (
            <div key={index} className="flex items-center gap-2">
              <span 
                className="w-4 h-4 rounded-sm" 
                style={{ backgroundColor: label.labelColor }}
              />
              <span className="text-sm">{label.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RideStatisticsChart;