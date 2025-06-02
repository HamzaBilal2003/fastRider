import React, { useEffect, useRef } from 'react';
import { Chart, ChartData, ChartOptions } from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';

Chart.register(zoomPlugin);

interface SiteStatisticsChartProps {
  data: ChartData;
  NotZoom?: boolean; // Optional prop to disable zoom functionality
}

const SiteStatisticsChart: React.FC<SiteStatisticsChartProps> = ({ data, NotZoom = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Ensure proper cleanup of previous chart instance
    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    // Create new chart
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const newChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                drawBorder: false,
              },
            },
            x: {
              grid: {
                display: false,
              },
            },
          },
          plugins: {
            legend: {
              position: 'top' as const,
            },
            zoom: NotZoom
              ? undefined // Disable zoom if NotZoom is true
              : {
                  pan: {
                    enabled: true,
                    mode: 'xy', // Allow panning in both directions
                  },
                  zoom: {
                    wheel: {
                      enabled: true, // Enable zooming with the mouse wheel
                    },
                    pinch: {
                      enabled: true, // Enable zooming with pinch gestures
                    },
                    mode: 'xy', // Allow zooming in both directions
                  },
                },
          },
        } as ChartOptions,
      });

      // Store the chart instance
      chartRef.current = newChart;
    } catch (error) {
      console.error('Error creating chart:', error);
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [data, NotZoom]);

  return (
    <div className="relative h-full w-full">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default SiteStatisticsChart;