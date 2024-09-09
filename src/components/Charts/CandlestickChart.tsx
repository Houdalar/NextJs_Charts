"use client";

import { ApexOptions } from "apexcharts";
import React from "react";
import dynamic from "next/dynamic";
import { useChartData } from "@/hooks/useChartData";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "candlestick",
      height: 335,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: "#3C50E0",
          downward: "#80CAEE"
        }
      }
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: 'datetime',
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Satoshi",
      fontWeight: 500,
      fontSize: "14px",
      markers: {
        size: 99,
      },
    },
    fill: {
      opacity: 1,
    },
  };
  
  const candlestickChart: React.FC = () => {
    const { chartsData, loading, errors } = useChartData([{ url: "candlestick-data/", type: 'candlestick' }]);
  
    if (loading) return <p>Loading...</p>;
    if (errors.length > 0) return <p>Error loading data!</p>;
    if (!chartsData.length) return <p>No data available for the chart.</p>;

  
    const series = chartsData.length > 0 ? chartsData[0].series : [];
  
    return (
      <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
        <div className="mb-4 justify-between gap-4 sm:flex">
            <h4 className="text-xl font-semibold text-black dark:text-white">
            Candlestick Chart
            </h4>
        </div>
  
        <div>
          <div id="chartTwo" className="-mb-9 -ml-5">
            <ReactApexChart
              options={options}
              series={series}
              type="candlestick"
              height={350}
              width={"100%"}
            />
          </div>
        </div>
      </div>
    );
  };
  
  export default candlestickChart;