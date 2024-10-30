import { useState, useEffect } from "react";
import { RiContactsBook3Fill } from "react-icons/ri";
import { GoArrowRight } from "react-icons/go";
import { TbSwitch3 } from "react-icons/tb";
import Navbar from '../../component/Navbar'


const ExchangRate = () => {
    const [inputValue, setInputValue] = useState(0);
    const [outputValue, setOutputValue] = useState(0);
    const [orderOutputValue, setOrderOutputValue] = useState(0);
    const [orderOutCurrency, setOrderCurrency] = useState("បាត");
    const [fromCurrency, setFromCurrency] = useState("រៀល");
    const [toCurrency, setToCurrency] = useState("ដុល្លារ");

    const images = {
        រៀល: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_Cambodia.svg/640px-Flag_of_Cambodia.svg.png",
        ដុល្លារ: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg/640px-Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg.png",
        បាត: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgR91x7xqvhr1q_3QLs_UWSbKgSOHG0fST4EMqdpwG97qD4u1Ig9tnLG6dxmxJb1kOLPU&usqp=CAU",
        ឡាក់: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Flag_of_Laos.svg/langkm-1100px-Flag_of_Laos.svg.png",
        ដុង: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdacJgzzzziBFMJYLEGJzFteXqna4N8JbyDg&s"
    };

    const exchangeRateKHR = 4100; // រៀល to ដុល្លារ​VND/LAK
    const thbToKhrRateTHB = 120; // បាត to រៀល

    const exchangeRates = {
        រៀល: { ដុល្លារ: 1 / exchangeRateKHR, បាត: 1 / thbToKhrRateTHB },
        ដុល្លារ: { រៀល: exchangeRateKHR, បាត: exchangeRateKHR / thbToKhrRateTHB },
        បាត: { រៀល: thbToKhrRateTHB, ដុល្លារ: thbToKhrRateTHB / exchangeRateKHR },
    };

    useEffect(() => {
        // Check if both currencies are ដុល្លារ and change to រៀល if true
        if (fromCurrency === "ដុល្លារ" && toCurrency === "ដុល្លារ") {
            setToCurrency("រៀល");
        }
        setInputValue(0);
        setOutputValue(0);
        setOrderOutputValue(0);

        if (fromCurrency === "រៀល" && toCurrency === "រៀល") {
            setToCurrency("ដុល្លារ");
        }

        // Determine order currency based on the selected toCurrency
        const currencyMap = {
            "ដុល្លារ": { "រៀល": "បាត", "បាត": "រៀល", "រៀល": "បាត" },
            "រៀល": { "ដុល្លារ": "បាត", "បាត": "ដុល្លារ" },
            "បាត": { "ដុល្លារ": "រៀល", "រៀល": "ដុល្លារ" },
        };

        setOrderCurrency(currencyMap[toCurrency][fromCurrency]);
    }, [fromCurrency, toCurrency]);

    useEffect(() => {
        // Update orderOutputValue when inputValue or currencies change
        const conversionRateOrder = exchangeRates[fromCurrency][orderOutCurrency];
        setOrderOutputValue(parseFloat((inputValue * conversionRateOrder).toFixed(2)));
    }, [inputValue, fromCurrency, orderOutCurrency]);

    const handleInputChange = (e) => {
        const value = parseFloat(e.target.value) || 0;
        setInputValue(value);

        // Conversion logic for output value
        if (fromCurrency !== toCurrency) {
            const conversionRate = exchangeRates[fromCurrency][toCurrency];
            setOutputValue(parseFloat((value * conversionRate).toFixed(2)));
        } else {
            setOutputValue(value);
        }
    };

    const handleSwitch = () => {
        // Switch the currencies
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
        setInputValue(0);
        setOutputValue(0);
        setOrderOutputValue(0);
    };

    const getToCurrencyOptions = () => {
        // Return the available options for "To" currency based on "From" currency
        const options = [
            { value: "រៀល", label: "Khmer Riel (រៀល)" },
            { value: "ដុល្លារ", label: "US Dollar (ដុល្លារ)" },
            { value: "បាត", label: "Thai Baht (បាត)" }
        ];

        return options.filter(option => {
            if (fromCurrency === "ដុល្លារ" && option.value === "ដុល្លារ") return false;
            if (fromCurrency === "រៀល" && option.value === "រៀល") return false;
            if (fromCurrency === "បាត" && option.value === "បាត") return false;
            return true;
        });
    };



    // Function to get all exchange rate statements
    const getExchangeRateStatements = () => {
        const statements = [];

        for (const fromCurrency in exchangeRates) {
            for (const toCurrency in exchangeRates[fromCurrency]) {
                const rate = exchangeRates[fromCurrency][toCurrency];
                // Create the exchange rate statement
                statements.push({
                    fromCurrency,
                    toCurrency,
                    rate: rate.toFixed(4),
                });
            }
        }

        return statements;
    };

    const exchangeRateStatements = getExchangeRateStatements();


    return (
        <div>
            <Navbar />
            <div className='py-16 px-4 md:ml-64 bg-white dark:bg-gray-950'>

                <div className="">
                    <div className="flex items-center gap-2 py-5">
                        <RiContactsBook3Fill className="text-lg" />
                        <p className="text-lg font-bold font-NotoSansKhmer">អត្រាប្តូប្រាក់</p>
                    </div>

                    {/* Currency Selector */}
                    <div className="mt-5 flex gap-5 items-center pb-8">
                        <div>
                        <label htmlFor="fromCurrencySelect" className="font-NotoSansKhmer font-bold text-lg">អត្រាប្តូប្រាក់ ពី</label>
                        <select
                                id="fromCurrencySelect"
                                value={fromCurrency}
                                onChange={(e) => setFromCurrency(e.target.value)}
                                className="input_text font-NotoSansKhmer font-bold w-[350px] block"
                                >
                                <option value="រៀល">Khmer Riel (រៀល)</option>
                                <option value="ដុល្លារ">US Dollar (ដុល្លារ)</option>
                                <option value="បាត">Thai Baht (បាត)</option>
                            </select>
                        </div>
                        <div><GoArrowRight className="w-10 h-10 translate-y-3 text-gray-600" /></div>
                        <div>
                        <label htmlFor="toCurrencySelect" className="font-NotoSansKhmer font-bold text-lg">ទៅ</label>
                        <select
                                id="toCurrencySelect"
                                value={toCurrency}
                                onChange={(e) => setToCurrency(e.target.value)}
                                className="input_text font-NotoSansKhmer font-bold w-[350px] block"
                                >
                                {getToCurrencyOptions().map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    

                    {/* From Currency Input */}
                    <div className="flex items-center gap-10">
                        <div className="relative w-full space-y-2">
                            <label htmlFor="fromCurrency" className="font-NotoSansKhmer font-bold text-lg">អត្រាប្តូប្រាក់ ពី ប្រាក់{fromCurrency}</label>
                            <input
                                type="number"
                                id="fromCurrency"
                                className="input_text"
                                placeholder={fromCurrency}
                                value={inputValue}
                                onChange={handleInputChange}
                            />
                            <div className="absolute right-0 p-2.5 px-5 bg-blue-500 top-6">
                                <p className="text-white">{fromCurrency}</p>
                            </div>
                        </div>

                        {/* Switch Currencies Button */}
                        <div className="mt-5">
                            <TbSwitch3
                                className="w-10 h-10 text-gray-600 cursor-pointer hover:text-gray-800"
                                onClick={handleSwitch}
                            />
                        </div>

                        <div className="relative w-full space-y-2">
                            <label htmlFor="toCurrency"className="font-NotoSansKhmer font-bold text-lg">ទៅ  ប្រាក់{toCurrency}</label>
                            <input
                                type="number"
                                id="toCurrency"
                                readOnly
                                className="bg-gray-100 input_text"
                                placeholder={toCurrency}
                                value={outputValue}
                            />
                            <div className="absolute right-0 p-2.5 px-5 bg-blue-500 top-6">
                                <p className="text-white">{toCurrency}</p>
                            </div>
                        </div>

                        <div className="relative w-full space-y-2">
                            <label htmlFor="orderCurrency" className="font-NotoSansKhmer font-bold text-lg">ប្រាក់{orderOutCurrency}</label>
                            <input
                                type="number"
                                id="orderCurrency"
                                readOnly
                                className="bg-gray-100 input_text"
                                placeholder={orderOutCurrency}
                                value={orderOutputValue}
                            />
                            <div className="absolute right-0 p-2.5 px-5 bg-blue-500 top-6">
                                <p className="text-white">{orderOutCurrency}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex border-t-4 justify-between mt-10 shadow-lg p-2 pr-8 border-blue-700 rounded-lg">
                        <div>
                        </div>
                        <div className=" bg-blue-950 rounded-lg">
                            <table className="min-w-full border-collapse border border-gray-200">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border border-gray-300 px-4 py-2"></th>
                                        <th className="border border-gray-300 px-4 py-2">អត្រាប្តូប្រាក់</th>
                                        <th className="border border-gray-300 px-4 py-2">Rate</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {exchangeRateStatements.map((statement, index) => (
                                        <tr key={index} className="hover:bg-gray-50 text-2xl">
                                            <td className="border border-gray-300 px-4 py-2 flex space-x-2 items-center">
                                                <img src={images[statement.fromCurrency]} alt={statement.fromCurrency} width="50" height="50" />
                                                <img className="h-8 w-8" src="https://cdn.pixabay.com/animation/2023/08/11/21/18/21-18-05-265_512.gif" />
                                                <img src={images[statement.toCurrency]} alt={statement.toCurrency} width="50" height="50" />
                                            </td>
                                            <td className="border border-gray-300 px-4 text-center text-yellow-300 py-2">
                                                <div className="flex space-x-12 items-center">
                                                    <span>   {statement.fromCurrency}</span>
                                                    <span><img className="h-8" src="https://cdn.pixabay.com/animation/2022/10/06/13/44/13-44-02-515_512.gif" alt="" />
                                                    </span>
                                                    <span>   {statement.toCurrency}</span>
                                                </div>
                                            </td>

                                            <td className="border border-gray-300 text-yellow-300 px-4 py-2">
                                                {statement.rate}
                                            </td>
                                        </tr>

                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};


export default ExchangRate