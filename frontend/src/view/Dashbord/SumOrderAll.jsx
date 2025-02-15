// // import React, { useState, useEffect } from "react";
// // import ReactApexChart from "react-apexcharts";
// // import axios from "axios";
// // import { API_URL } from "../../service/api";

// // const ApexChart = () => {
// //     const [sumOrder, setSumOrder] = useState({});
// //     const [error, setError] = useState(null);

// //     useEffect(() => {
// //         getCostPrice();
// //     }, []);

// //     const getCostPrice = async () => {
// //         try {
// //             //   const response = await axios.get(`${API_URL}/api/dashbord/sum_order`);
// //             const response = await axios.get(`${API_URL}/api/dashbord/sum_order`);

// //             console.log(response.data); // Debug response
// //             setSumOrder(response.data[0] || {});
// //         } catch (error) {
// //             setError("Error fetching data");
// //             console.error(error);
// //         }
// //     };

// //     // Ensure data is available before rendering the chart
// //     if (error) {
// //         return <div>{error}</div>;
// //     }

// //     if (!sumOrder.TotalAmountUSD || !sumOrder.TotalAmountKHR || !sumOrder.TotalAmountTHB) {
// //         return <div>Loading...</div>;
// //     }

// //     const state = {
// //         series: [
// //             {
// //                 name: "TotalAmountUSD",
// //                 type: "column",
// //                 data: [sumOrder.TotalAmountUSD || 0],
// //             },
// //             {
// //                 name: "TotalAmountKHR",
// //                 type: "area",
// //                 data: [sumOrder.TotalAmountKHR || 0],
// //             },
// //             {
// //                 name: "TotalAmountTHB",
// //                 type: "line",
// //                 data: [sumOrder.TotalAmountTHB || 0],
// //             },
// //         ],
// //         options: {
// //             chart: {
// //                 height: 350,
// //                 type: "line",
// //                 stacked: false,
// //             },
// //             stroke: {
// //                 width: [0, 2, 5],
// //                 curve: "smooth",
// //             },
// //             plotOptions: {
// //                 bar: {
// //                     columnWidth: "50%",
// //                 },
// //             },
// //             fill: {
// //                 opacity: [0.85, 0.25, 1],
// //                 gradient: {
// //                     inverseColors: false,
// //                     shade: "light",
// //                     type: "vertical",
// //                     opacityFrom: 0.85,
// //                     opacityTo: 0.55,
// //                     stops: [0, 100, 100, 100],
// //                 },
// //             },
// //             labels: ["Total Amount (USD, KHR, THB)"],
// //             markers: {
// //                 size: 0,
// //             },
// //             xaxis: {
// //                 categories: ["USD", "KHR", "THB"], // Corrected to use categories instead of datetime
// //             },
// //             yaxis: {
// //                 title: {
// //                     text: "Amount",
// //                 },
// //             },
// //             tooltip: {
// //                 shared: true,
// //                 intersect: false,
// //                 y: {
// //                     formatter: function (y) {
// //                         if (typeof y !== "undefined") {
// //                             return y.toFixed(2) ; // Adjust as necessary
// //                         }
// //                         return y;
// //                     },
// //                 },
// //             },
// //         },
// //     };

// //     return (
// //         <div className="max-w-screen-2xl w-full mx-auto">
// //         <h2 className="text-2xl text-gray-600 font-NotoSansKhmer font-bold mb-4">សរុបការលក់ក្នុងឆ្នាំនេះទៅតាមខែ</h2>
  
// //             <div id="chart">
// //                 <ReactApexChart
// //                     options={state.options}
// //                     series={state.series}
// //                     type="line"
// //                     height={350}
// //                 />
// //             </div>
// //         </div>
// //     );
// // };

// // export default ApexChart;








// import React, { useState, useEffect } from "react";
// import ReactApexChart from "react-apexcharts";
// import axios from "axios";
// import { API_URL } from "../../service/api";

// const ApexChart = () => {
//     const [sumOrder, setSumOrder] = useState([]);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         getCostPrice();
//     }, []);

//     const getCostPrice = async () => {
//         try {
//             const response = await axios.get(`${API_URL}/api/dashbord/sum_order`);
//             console.log(response.data); // Debug response
//             setSumOrder(response.data);
//         } catch (error) {
//             setError("Error fetching data");
//             console.error(error);
//         }
//     };

//     // Ensure data is available before rendering the chart
//     if (error) {
//         return <div>{error}</div>;
//     }

//     if (sumOrder.length === 0) {
//         return <div>Loading...</div>;
//     }

//     // Prepare data for the chart
//     const dates = sumOrder.map(item => item.Date); // Extract dates
//     const totalAmountUSD = sumOrder.map(item => item.TotalAmountUSD || 0);
//     const totalAmountKHR = sumOrder.map(item => item.TotalAmountKHR || 0);
//     const totalAmountKHR1 = sumOrder.map(item => item.TotalAmountKHR1 || 0);
//     const totalAmountTHB = sumOrder.map(item => item.TotalAmountTHB || 0);
//     const totalAmountTHB1 = sumOrder.map(item => item.TotalAmountTHB1 || 0);

//     const state = {
//         series: [
//             {
//                 name: "TotalAmountUSD",
//                 type: "column",
//                 data: totalAmountUSD,
//             },
//             {
//                 name: "TotalAmountKHR",
//                 type: "area",
//                 data: totalAmountKHR,
//             },
//             {
//                 name: `TotalAmountTHB`,
//                 type: "line",
//                 data: totalAmountTHB,
//             },
//         ],
//         options: {
//             chart: {
//                 height: 350,
//                 type: "line",
//                 stacked: false,
//             },
//             stroke: {
//                 width: [0, 2, 5],
//                 curve: "smooth",
//             },
//             plotOptions: {
//                 bar: {
//                     columnWidth: "50%",
//                 },
//             },
//             fill: {
//                 opacity: [0.85, 0.25, 1],
//                 gradient: {
//                     inverseColors: false,
//                     shade: "light",
//                     type: "vertical",
//                     opacityFrom: 0.85,
//                     opacityTo: 0.55,
//                     stops: [0, 100, 100, 100],
//                 },
//             },
//             xaxis: {
//                 categories: dates, // Use the dates from the database
//             },
//             yaxis: {
//                 title: {
//                     text: "Amount",
//                 },
//             },
//             tooltip: {
//                 shared: true,
//                 intersect: false,
//                 y: {
//                     formatter: function (y) {
//                         if (typeof y !== "undefined") {
//                             return y.toFixed(2)  + " $"; // Display the value with 2 decimals
//                         }
//                         return y;
//                     },
//                 },
//             },
//         },
//     };

//     return (
//         <div className="max-w-screen-2xl w-full mx-auto">
//             <h2 className="text-2xl text-gray-600 font-NotoSansKhmer font-bold mb-4">សរុបការលក់</h2>
//             <div id="chart">
//                 <ReactApexChart
//                     options={state.options}
//                     series={state.series}
//                     type="line"
//                     height={350}
//                 />
//             </div>
//         </div>
//     );
// };

// export default ApexChart;



import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import { API_URL } from "../../service/api";

const ApexChart = () => {
    const [sumOrder, setSumOrder] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getCostPrice();
    }, []);

    const getCostPrice = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/dashbord/sum_order`);
            console.log(response.data); // Debug response
            setSumOrder(response.data);
        } catch (error) {
            setError("Error fetching data");
            console.error(error);
        }
    };

    // Ensure data is available before rendering the chart
    if (error) {
        return <div>{error}</div>;
    }

    if (sumOrder.length === 0) {
        return <div>Loading...</div>;
    }

    // Prepare data for the chart
    const dates = sumOrder.map(item => item.Date); // Extract dates
    const totalAmountUSD = sumOrder.map(item => item.TotalAmountUSD || 0);
    const totalAmountKHR = sumOrder.map(item => item.TotalAmountKHR || 0);
    const totalAmountTHB = sumOrder.map(item => item.TotalAmountTHB || 0);
    const totalAmountKHR1 = sumOrder.map(item => item.TotalAmountKHR1 || 0);
    const totalAmountTHB1 = sumOrder.map(item => item.TotalAmountTHB1 || 0);
    // Conversion rate: Example from USD to KHR
    const USDtoKHR = 4200;  // Example conversion rate from USD to KHR (can be dynamically updated)

    const state = {
        series: [
            {
                name: "ចំនួនសរុបUSD",
                type: "column",
                data: totalAmountUSD,
            },
            {
                name: "សរុបចំនួនប្រាក់រៀល",
                type: "area",
                data: totalAmountKHR,
            },
            {
                name: "ចំនួនសរុបTHB",
                type: "line",
                data: totalAmountTHB,
            },
        ],
        options: {
            chart: {
                height: 350,
                type: "line",
                stacked: false,
            },
            stroke: {
                width: [0, 2, 5],
                curve: "smooth",
            },
            plotOptions: {
                bar: {
                    columnWidth: "50%",
                },
            },
            fill: {
                opacity: [0.85, 0.25, 1],
                gradient: {
                    inverseColors: false,
                    shade: "light",
                    type: "vertical",
                    opacityFrom: 0.85,
                    opacityTo: 0.55,
                    stops: [0, 100, 100, 100],
                },
            },
            xaxis: {
                categories: dates, // Use the dates from the database
            },
            yaxis: {
                title: {
                    text: "Amount",
                },
            },
            tooltip: {
                shared: true,
                intersect: false,
                y: {
                    formatter: function (y, { seriesIndex, dataPointIndex, w }) {
                        let value = y;
                        // If it's the USD series, convert to KHR
                        if (seriesIndex === 0) {
                            value = value ; // Convert USD to KHR
                            return value.toFixed(2) + " $"; // Show as KHR
                        }
                        if (seriesIndex === 1) {
                            value = value ; // Convert USD to KHR
                            return value.toFixed(2) + ` $ => ${((value/value) * totalAmountKHR1[dataPointIndex]) || '0.00'}  រៀល`; // Show as KHR
                        }
                        if (seriesIndex === 2) {
                            value = value ; // Convert USD to KHR
                            return value.toFixed(2) + ` $  =>  ${((value/value) * totalAmountTHB1[dataPointIndex]) || '0.00'}  បាត`; // Show as KHR
                        }
                        return value.toFixed(2) + " $"; // Default as USD or other currencies
                    },
                },
            },
        },
    };

    return (
        <div className="max-w-screen-2xl w-full mx-auto">
            <h2 className="text-2xl text-gray-600 font-NotoSansKhmer font-bold mb-4">សរុបការលក់</h2>
            <div id="chart">
                <ReactApexChart
                    options={state.options}
                    series={state.series}
                    type="line"
                    height={350}
                />
            </div>
        </div>
    );
};

export default ApexChart;
