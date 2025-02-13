import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import { API_URL } from "../../service/api";


const ChartPruchaeseDetail = () => {
    const [purchaseDetail, setPurchaseDetail] = useState([]);
    const [state, setState] = useState({
        series: [],
        options: {
            chart: {
                width: 520,
                type: 'pie',
            },
            labels: [],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 300,
                        },
                        legend: {
                            position: 'bottom',
                        },
                    },
                },
            ],
        },
    });

    const fetchPurchaseDetail = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/dashbord/product`);
            console.log("API Response:", response.data); // Debug API response
            if (Array.isArray(response.data)) {
                setPurchaseDetail(response.data);
            } else {
                console.error("Unexpected API response format:", response.data);
            }
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };


    useEffect(() => {
        fetchPurchaseDetail();
    }, []);


    useEffect(() => {
        if (purchaseDetail.length > 0) {
            console.log("Processing Data:", purchaseDetail); // Debug data before processing

            const salesData = purchaseDetail.map(item => ({
                product: item.pro_names, // Product name
                total: Number(item.total_quantity) || 0, // Ensure it's a number

            }));

            console.log("Processed Sales Data:", salesData); // Debug processed data

            if (salesData.length > 0) {
                const series = salesData.map(item => item.total);
                const labels = salesData.map(item => item.product);

                console.log("Updating Chart:", { series, labels });

                setState(prevState => ({
                    ...prevState,
                    series: series,
                    options: {
                        ...prevState.options,
                        labels: labels,
                    },
                }));
            }
        }
    }, [purchaseDetail]); // Use updated purchaseDetail

    return (
        <div className="max-w-screen-2xl mx-auto px-6">
            <h2 className="text-2xl text-gray-600 font-NotoSansKhmer font-bold mb-4">បញ្ចាទិញផលិតផលក្នុងឆ្នាំនេះ</h2>

            <div id="chart">
                {state.series.length > 0 ? (
                    <ReactApexChart options={state.options} series={state.series} type="pie" width={440} />
                ) : (
                    <p>Loading chart...</p>
                )}
            </div>
        </div>
    );
};

export default ChartPruchaeseDetail;
