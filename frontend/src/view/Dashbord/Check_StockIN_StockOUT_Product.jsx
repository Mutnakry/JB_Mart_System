// import React, { useEffect, useState } from "react";
// import ReactApexChart from "react-apexcharts";
// import axios from "axios";
// import { API_URL } from "../../service/api";

// const StockChart = () => {
//     const [chartData, setChartData] = useState({
//         series: [],
//         options: {
//             chart: {
//                 type: "bar",
//                 height: 350
//             },
//             plotOptions: {
//                 bar: {
//                     horizontal: false,
//                     columnWidth: "55%"
//                 }
//             },
//             dataLabels: {
//                 enabled: false
//             },
//             stroke: {
//                 show: true,
//                 width: 2,
//                 colors: ["transparent"]
//             },
//             xaxis: {
//                 categories: []
//             },
//             yaxis: {
//                 title: {
//                     text: "Stock Quantity"
//                 }
//             },
//             fill: {
//                 opacity: 1
//             },
//             tooltip: {
//                 y: {
//                     formatter: (val) => `${val} units`
//                 }
//             }
//         }
//     });

//     useEffect(() => {
//         const fetchStockData = async () => {
//             try {
//                 const response = await axios.get(`${API_URL}/api/dashbord/stock_product`);

//                 if (Array.isArray(response.data)) {
//                     const products = response.data.map((item) => item.pro_names);
//                     const stockIn = response.data.map((item) => Number(item.stock_IN) || 0);
//                     const stockOut = response.data.map((item) => Number(item.stock_OUT) || 0);

//                     setChartData((prev) => ({
//                         ...prev,
//                         series: [
//                             { name: "Stock In", data: stockIn },
//                             { name: "Stock Out", data: stockOut }
//                         ],
//                         options: { ...prev.options, xaxis: { categories: products } }
//                     }));
//                 } else {
//                     console.error("Unexpected API response format:", response.data);
//                 }
//             } catch (error) {
//                 console.error("Error fetching stock data:", error);
//             }
//         };

//         fetchStockData();
//     }, []);

//     return (
//         <div className="max-w-screen-2xl w-full mx-auto ">
//                <h2 className="md:text-2xl text-sm text-gray-600 font-NotoSansKhmer font-bold mb-4">ចំណាយទិញផលិតផលសរុបក្នុងឆ្នាំនេះ</h2>
//             <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
//         </div>
//     );
// };

// export default StockChart;








import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import { API_URL } from "../../service/api";

const StockChart = () => {
    const [chartData, setChartData] = useState({
        series: [],
        options: {
            chart: {
                type: "line",
                height: 350,
                toolbar: { show: false }
            },
            stroke: {
                curve: "smooth",
                width: [3, 3] // Line thickness
            },
            markers: {
                size: 4, // Small dots at data points
                colors: ["#008FFB", "#FF4560"],
                strokeWidth: 2
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: [],
                labels: { rotate: -45 }
            },
            yaxis: {
                title: {
                    text: "Stock Quantity"
                }
            },
            tooltip: {
                shared: true,
                intersect: false,
                y: {
                    formatter: (val) => `${val} units`
                }
            },
            legend: {
                position: "top"
            },
            colors: ["#008FFB", "#FF4560"] // Blue for Stock In, Red for Stock Out
        }
    });

    useEffect(() => {
        const fetchStockData = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/dashbord/stock_product`);

                if (Array.isArray(response.data)) {
                    const products = response.data.map((item) => item.pro_names);
                    const stockIn = response.data.map((item) => Number(item.stock_IN) || 0);
                    const stockOut = response.data.map((item) => Number(item.stock_OUT) || 0);

                    setChartData((prev) => ({
                        ...prev,
                        series: [
                            { name: "Stock In", data: stockIn },
                            { name: "Stock Out", data: stockOut }
                        ],
                        options: { ...prev.options, xaxis: { categories: products } }
                    }));
                } else {
                    console.error("Unexpected API response format:", response.data);
                }
            } catch (error) {
                console.error("Error fetching stock data:", error);
            }
        };

        fetchStockData();
    }, []);

    return (
        <div className="max-w-screen-2xl w-full mx-auto">
            <h2 className="md:text-2xl text-sm text-gray-600 font-NotoSansKhmer font-bold mb-4">
                ចំណាយទិញផលិតផលសរុបក្នុងឆ្នាំនេះ
            </h2>
            <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={350} />
        </div>
    );
};

export default StockChart;
