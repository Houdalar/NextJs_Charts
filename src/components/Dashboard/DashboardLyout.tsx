"use client";
import dynamic from "next/dynamic";
import React from "react";
import LineChart from "../Charts/lineChart";
import BarChart from "../Charts/barChart";




const PieChart = dynamic(() => import("@/components/Charts/pieChart"), {
  ssr: false,
});
const CandlestickChart = dynamic(() => import("@/components/Charts/CandlestickChart"), { ssr: false });

const DashboardLyout: React.FC = () => {
  return (
    <>
  
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <LineChart />
        <BarChart />
        <PieChart />
        <CandlestickChart />

      </div>
    </>
  );
};

export default DashboardLyout;
