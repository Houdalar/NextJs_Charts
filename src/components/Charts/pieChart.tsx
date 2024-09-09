import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { useChartData } from "@/hooks/useChartData";
import { ApexOptions } from "apexcharts";

const colors= ["#3C50E0", "#6577F3", "#8FD0EF", "#0FADCF"];

const options: ApexOptions = {
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "donut",
  },
  colors: ["#3C50E0", "#6577F3", "#8FD0EF", "#0FADCF"],

  legend: {
    show: false,
    position: "bottom",
  },
  plotOptions: {
    pie: {
      donut: {
        size: "65%",
        background: "transparent",
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};

const pieChart: React.FC = () => {
  const { chartsData, loading, errors } = useChartData([
    { url: "pie-chart-data/", type: "pie" },
  ]);

  if (loading) return <p>Loading...</p>;
  if (errors.length > 0) return <p>Error loading data!</p>;

  const series = chartsData.length > 0 ? chartsData[0].series[0].data : [];
  const labels = chartsData.length > 0 ? chartsData[0].labels : [];
  const total = series.reduce((acc: any, curr: any) => acc + curr, 0); // Calculate the total to compute percentages

  const dynamicOptions = {
    ...options,
    labels: labels
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-5">
      <div className="mb-3 justify-between gap-4 sm:flex">
          <h5 className="text-xl font-semibold text-black dark:text-white">
          Pie Chart
          </h5>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart options={dynamicOptions} series={series} type="donut" />
        </div>
      </div>
      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
        {labels!.map((label, index) => (
          <div className="w-full px-8 sm:w-1/2" key={index}>
            <div className="flex w-full items-center">
              <span className="mr-2 block h-3 w-full max-w-3 rounded-full" style={{ backgroundColor: colors[index % colors.length] }}></span>
              <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                <span> {label} </span>
                <span> {((series[index] / total) * 100).toFixed(1)}% </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default pieChart;