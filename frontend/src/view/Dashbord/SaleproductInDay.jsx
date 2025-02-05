import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import { API_URL } from "../../service/api";


const MonthlySalesChart = () => {
    const [chartData, setChartData] = useState({
        series: [{ name: "Total Sales", data: [] }],
        options: {
            chart: { type: "line", height: 350 },
            xaxis: { categories: [] },
            colors: ["#1a1aff"],
        },
    });

    useEffect(() => {
        const fetchMonthlyData = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/dashbord/saleday`); // Backend API endpoint
                const dailyData = Array(31).fill(0); // Create an array for 31 days (1-31)

                // Populate daily data from the API response
                response.data.forEach(({ day, total_amount }) => {
                    dailyData[day - 1] = total_amount; 
                });
                const categories = Array.from({ length: 31 }, (_, i) => `ថ្ងៃទី ${i + 1}`);
                setChartData({
                    series: [{ name: "ថ្ងៃនេះលក់បានសរុប​  $", data: dailyData }],
                    options: { ...chartData.options, xaxis: { categories } },
                });
            } catch (error) {
                console.error("Error fetching monthly data:", error);
            }
        };
        fetchMonthlyData();
    }, []); // Only run once when the component mounts

    return (
        <div className="max-w-screen-2xl w-full mx-auto">
            <h2 className="text-2xl text-gray-600 font-NotoSansKhmer font-bold mb-4">សរុបការលក់ប្រចាំថ្ងៃ</h2>
            <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="line"
                height={350}
            />
        </div>
    );
};

export default MonthlySalesChart;
