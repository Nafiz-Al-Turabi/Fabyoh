import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import axiosInstance from "../../Axios/axiosInstance";

const PaymentChart = () => {
  const token = localStorage.getItem("authToken");
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const { isLoading, isError, data = [], error } = useQuery({
    queryKey: ["userOrders"],
    queryFn: async () => {
      const response = await axiosInstance.get("/adminOrders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
  });

  const [series, setSeries] = useState([]);
  const [categories, setCategories] = useState([]);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  // Process data when fetched
  useEffect(() => {
    if (data.length) {
      const prices = data.map((order) => parseFloat(order.price));
      const dates = data.map((order) => formatDate(order.date));

      setSeries([
        {
          name: "Payments",
          data: prices,
        },
      ]);
      setCategories(dates);
    }
  }, [data]);

  const chartOptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: categories, 
    },
    yaxis: {
      title: {
        text: "$ (amount)",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: (val) => "$ " + val.toFixed(2), 
      },
    },
  };

  useEffect(() => {
    if (isLoading || isError || !chartRef.current) {
      return undefined;
    }

    let isActive = true;

    const renderChart = async () => {
      const apexChartsModule = await import("apexcharts");
      const ApexCharts = apexChartsModule.default?.default ?? apexChartsModule.default ?? apexChartsModule;

      if (!isActive || !chartRef.current) {
        return;
      }

      chartInstanceRef.current?.destroy();

      const chart = new ApexCharts(chartRef.current, {
        ...chartOptions,
        series,
      });

      chartInstanceRef.current = chart;
      await chart.render();
    };

    renderChart();

    return () => {
      isActive = false;
      chartInstanceRef.current?.destroy();
      chartInstanceRef.current = null;
    };
  }, [isLoading, isError, chartOptions, series]);

  return (
    <div className="w-full mt-20 bg-rose-100 rounded-lg pt-2">
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error: {error.message}</p>
      ) : (
        <div ref={chartRef} />
      )}
    </div>
  );
};

export default PaymentChart;
