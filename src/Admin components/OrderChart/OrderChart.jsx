import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import ReactApexChart from 'react-apexcharts';
import axiosInstance from "../../Axios/axiosInstance";

const ApexChart = () => {
    const token = localStorage.getItem('authToken')
    const { isLoading, isError, data = [], error, refetch } = useQuery({
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


    return (
        <div className="mt-20 bg-amber-50 w-full rounded">
            <div id="chart" className="flex justify-center items-center">
                <ReactApexChart options={options} series={series} type="pie" width={580} />
            </div>
            <div id="html-dist"></div>
        </div>
    );
};

export default ApexChart;
