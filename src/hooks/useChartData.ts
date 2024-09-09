// hooks/useChartData.ts
import { useState, useEffect } from 'react';
import axios from 'axios';

interface ChartConfig {
  url: string;
  type: 'candlestick' | 'line' | 'bar' | 'pie';
}

interface ChartData {
    type: string;
    labels?: string[];
    series: Array<any>;
  }

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL; 

export const useChartData = (configs: ChartConfig[]) => {
  const [chartsData, setChartsData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataPromises = configs.map(config =>
          axios.get(`${apiBaseUrl}${config.url}`).then(response => {
            const data = formatChartData(response.data, config.type);
            return { ...data, type: config.type };
          })
        );

        const results = await Promise.all(dataPromises);
        setChartsData(results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching chart data: ', error);
        setErrors(prevErrors => [...prevErrors, 'Failed to fetch data']);
        setLoading(false);
      }
    };

    fetchData();
  }, [configs]);

  return { chartsData, loading, errors };
};

function formatChartData(data: any, type: string): ChartData {
    switch (type) {
      case 'candlestick':
        return {
          type: 'candlestick',
          series: [{
            data: data.data.map((item: any) => ({
              x: item.x,
              y: [item.open, item.high, item.low, item.close]
            }))
          }]
        };
      case 'line':
      case 'bar':
      case 'pie':
        return {
          type: type,
          labels: data.labels,
          series: [{ name: 'Data', data: data.data }]
        };
      default:
        return { type: 'unknown', series: [] }; 
    }
  }
  