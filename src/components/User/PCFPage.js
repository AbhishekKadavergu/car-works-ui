import React, { useState, useEffect } from 'react';
import { exportToCSV, exportToXLSX, exportToPDF } from '../../utils/exportUtils';
import Select from 'react-select';
import axiosInstance from '../../utils/axiosInstance';

const PCFPage = () => {
    const [pcfData, setPCFData] = useState([]);
    const [dsCodes, setDsCodes] = useState([]);   // For storing the list of dsCodes
    const [selectedDSCode, setSelectedDSCode] = useState(null);  // For storing the selected dsCode
    const [error, setError] = useState('');       // For handling errors
    const [loading, setLoading] = useState(false); // For handling loading states


    useEffect(() => {
        // Fetch all dsCodes when the component loads
        const fetchDSCodes = async () => {
            try {
                const response = await axiosInstance.get(`/api/car/ds-codes`);
                console.log(response)
                // const data = await response.json();
                setDsCodes(response.data.map(ds => ({ value: ds.code, label: ds.code })));
            } catch (error) {
                console.debug(error)
                setError('Failed to fetch Design Solutions');
            }
        };
        fetchDSCodes();
    }, []);

    // Handle fetching PCF data based on selected dsCode
    const handleFetchPCF = async () => {
        if (!selectedDSCode) {
            setError('Please select a Design Solution');
            return;
        }

        setLoading(true);
        setError('');
        setPCFData(null);

        try {
            const response = await axiosInstance.get(`/api/car/pcf-by-ds/${selectedDSCode.value}`);
            setPCFData(response.data?.parts);
        } catch (error) {
            setError('Failed to fetch PCF details');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold mb-6">Product Crabon Footprint (PCF)</h1>

            {/* Dropdown Section */}
            <div className="mb-6">
                <h2 className="text-xl mb-2">Select a Design Solution</h2>
                <Select
                    options={dsCodes}
                    value={selectedDSCode}
                    onChange={(option) => setSelectedDSCode(option)}
                    placeholder="Type or Select"
                    isSearchable={true}
                    className="w-64"
                />
            </div>

            {/* Fetch Button */}
            <button
                onClick={handleFetchPCF}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                disabled={loading}
            >
                {loading ? 'Loading...' : 'Fetch PCF'}
            </button>

            {/* Error Display */}
            {error && <div className="text-red-600 mt-4">{error}</div>}

            {/* Display PCF Data */}
            {pcfData && pcfData.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-2xl font-semibold mb-4">PCF Details</h3>

                    <div className="bg-white p-6 shadow-lg rounded-lg">
                        {/* Table */}
                        <table className="table-auto w-full">
                            <thead>
                                <tr className="bg-blue-600 text-white">
                                    <th className="px-4 py-2">Part Name</th>
                                    <th className="px-4 py-2">Quantity</th>
                                    <th className="px-4 py-2">Weight</th>
                                    <th className="px-4 py-2">Carbon Footprint</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pcfData.map((part, index) => (
                                    <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                                        <td className="border px-4 py-2 text-left">{part.name}</td>
                                        <td className="border px-4 py-2 text-right">{part.quantity}</td>
                                        <td className="border px-4 py-2 text-right">{part.weight}</td>
                                        <td className="border px-4 py-2 text-right">{part.carbonFootprint}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Export Buttons */}
                    <div className="mt-4 flex space-x-4">
                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                            onClick={() => exportToCSV(pcfData, 'pcf-data')}
                        >
                            Export to CSV
                        </button>
                        <button
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                            onClick={() => exportToXLSX(pcfData, 'pcf-data')}
                        >
                            Export to XLSX
                        </button>
                        <button
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                            onClick={() => exportToPDF(pcfData, 'pcf-data')}
                        >
                            Export to PDF
                        </button>
                    </div>
                </div>
            )}
        </div>

    )
};

export default PCFPage;
