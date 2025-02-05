// import React, { useState, useEffect } from "react";
// import ReactApexChart from "react-apexcharts";
// import axios from "axios";

// const Chart = () => {
//     const [chartData, setChartData] = useState({
//         series: [{ name: "Total Sales", data: [] }],
//         options: {
//             chart: { type: "bar", height: 350 },
//             xaxis: { categories: [] },
//             colors: ['#1E90FF', '#FF6347', '#32CD32', '#FFD700', '#FF69B4', '#4B0082', '#FFA500', '#7B68EE'], // Corrected here
//         },
//     });

//     useEffect(() => {
//         const fetchPurchaseDetail = async () => {
//             try {
//                 const response = await axios.get("http://localhost:6700/api/chart/sale");
//                 const monthlyData = Array(12).fill(0);
//                 response.data.forEach(({ month, total_amount }) => {
//                     monthlyData[month - 1] = total_amount;
//                 });

//                 const categories = Array.from({ length: 12 }, (_, i) =>
//                     new Date(0, i).toLocaleString("default", { month: "long" })
//                 );

//                 setChartData({
//                     series: [{ name: "ខែនេះលក់បានសរុប​", data: monthlyData }],
//                     options: { ...chartData.options, xaxis: { categories } },
//                 });
//             } catch (error) {
//                 console.error("Error fetching purchase data:", error);
//             }
//         };

//         fetchPurchaseDetail();
//     }, []);

//     return (
//         <div className="max-w-screen-2xl w-full mx-auto">
//                <h2 className="text-2xl text-gray-600 font-NotoSansKhmer font-bold mb-4">សរុបការលក់ក្នុងឆ្នាំនេះទៅតាមខែ</h2>
//             <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
//         </div>
//     );
// };

// export default Chart;



import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import { API_URL } from "../../service/api";

const Chart = () => {
    const [chartData, setChartData] = useState({
        series: [{ name: "Total Sales", data: [] }],
        options: {
            chart: { type: "bar", height: 350 },
            xaxis: { categories: [] },
            plotOptions: {
                bar: {
                    distributed: true, // This will allow different colors for each bar
                },
            },
            colors: ['#1E90FF', '#FF6347', '#32CD32', '#FFD700', '#FF69B4', '#4B0082', '#FFA500', '#7B68EE','#3333ff','#9494b8','#4dff4d','#33ffcc'], // Multiple colors for the bars
        },
    });

    useEffect(() => {
        const fetchPurchaseDetail = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/dashbord/sale`);
                const monthlyData = Array(12).fill(0);
                response.data.forEach(({ month, total_amount }) => {
                    monthlyData[month - 1] = total_amount;
                });

                const categories = Array.from({ length: 12 }, (_, i) =>
                    new Date(0, i).toLocaleString("default", { month: "long" })
                );

                setChartData({
                    series: [{ name: "ខែនេះលក់បានសរុប​", data: monthlyData }],
                    options: { ...chartData.options, xaxis: { categories } },
                });
            } catch (error) {
                console.error("Error fetching purchase data:", error);
            }
        };

        fetchPurchaseDetail();
    }, []);

    return (
        <div className="max-w-screen-2xl w-full mx-auto">
            <h2 className="text-2xl text-gray-600 font-NotoSansKhmer font-bold mb-4">សរុបការលក់ក្នុងឆ្នាំនេះទៅតាមខែ</h2>
            <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
        </div>
    );
};

export default Chart;
