"use client";

import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import axios from "axios"; 
import { useChartData } from "@/hooks/useChartData";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
  legend: {
    show: false,
    position: "top",
    horizontalAlign: "left",
  },
  colors: ["#3C50E0", "#80CAEE"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    height: 335,
    type: "area",
    dropShadow: {
      enabled: true,
      color: "#623CEA14",
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },

    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: "straight",
  },
  // labels: {
  //   show: false,
  //   position: "top",
  // },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: "#fff",
    strokeColors: ["#3056D3", "#80CAEE"],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: "category",
    categories: [],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: "0px",
      },
    },
    min: 0,
    max: 100,
  },
};

interface ChartData {
  name: string;
  data: number[];
}

const lineChart: React.FC = () => {
  const { chartsData, loading, errors } = useChartData([
    { url: "line-chart-data/", type: 'line' } 
  ]);

  // Adjusted to handle data directly from the hook
  if (loading) return <p>Loading...</p>;
  if (errors.length > 0) return <p>Error loading data: {errors.join(", ")}</p>;
  if (!chartsData.length) return <p>No data available for the chart.</p>;

  const dynamicOptions = {
    ...options,
    xaxis: { ...options.xaxis, categories: chartsData[0].labels || [] }
  };

   


  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            line chart
          </h4>
          </div>
        
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={dynamicOptions}
            series={chartsData[0].series}
            type="area"
            height={350}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default lineChart;
