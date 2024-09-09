"use client";

import { ApexOptions } from "apexcharts";
import React from "react";
import dynamic from "next/dynamic";
import { useChartData } from "@/hooks/useChartData";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
  colors: ["#3C50E0", "#80CAEE"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "bar",
    height: 335,
    stacked: true,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  responsive: [
    {
      breakpoint: 1536,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 0,
            columnWidth: "25%",
          },
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 0,
      columnWidth: "25%",
      borderRadiusApplication: "end",
      borderRadiusWhenStacked: "last",
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: [], // To be dynamically filled
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

const barChart: React.FC = () => {
  // Assume you have some URL and you need a bar chart
  const { chartsData, loading, errors } = useChartData([{ url: "bar-chart-data/", type: 'bar' }]);

  if (loading) return <p>Loading...</p>;
  if (errors.length > 0) return <p>Error loading data!</p>;

  // Adjust options and series based on the fetched data
  const dynamicOptions = {
    ...options,
    xaxis: { ...options.xaxis, categories: chartsData[0].labels || [] }
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-4 justify-between gap-4 sm:flex">
          <h4 className="text-xl font-semibold text-black dark:text-white">
          Bar Chart
          </h4>
        </div>

      <div>
        <div id="chartTwo" className="-mb-9 -ml-5">
          <ReactApexChart
            options={dynamicOptions}
            series={chartsData[0].series}
            type="bar"
            height={350}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default barChart;
