import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../Axios/axiosInstance";

const ApexChart = () => {
    const token = localStorage.getItem('authToken')
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);
    const { isLoading, isError, data = [], error } = useQuery({
        queryKey: ['userOrders'],
        queryFn: async () => {
            const response = await axiosInstance.get('/adminOrders', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            return response.data;
        },
    });

    const [series, setSeries] = useState([0, 0, 0]);
    const [options, setOptions] = useState({
        chart: {
            width: 380,
            type: "pie",
        },
        labels: ["Pending", "Complete", "In Process"], 
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 300,
                    },
                    legend: {
                        position: "bottom",
                    },
                },
            },
        ],
    });

    // Calculate the number of orders for each status
    useEffect(() => {
        if (data.length > 0) {
            const pendingCount = data.filter(order => order.status === 'Pending').length;
            const completeCount = data.filter(order => order.status === 'Complete').length;
            const inProcessCount = data.filter(order => order.status === 'In Process').length;

            setSeries([pendingCount, completeCount, inProcessCount]);
        }
    }, [data]);

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
                ...options,
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
    }, [isLoading, isError, options, series]);


    return (
        <div className="mt-20 bg-amber-50 w-full rounded">
            {isLoading ? (
                <p className="p-4 text-center">Loading...</p>
            ) : isError ? (
                <p className="p-4 text-center">Error: {error.message}</p>
            ) : (
                <div id="chart" className="flex justify-center items-center">
                    <div ref={chartRef} />
                </div>
            )}
            <div id="html-dist"></div>
        </div>
    );
};

export default ApexChart;
