import React, { useState, useEffect } from 'react';
import { exportToCSV, exportToXLSX, exportToPDF } from '../../utils/exportUtils';

const BOMPage = () => {
    const [bomData, setBOMData] = useState([]);
  const api_url = process.env.REACT_APP_API_URL;


    useEffect(() => {
        // Fetch BOM data from API (you can replace this with your API call)
        const fetchBOMData = async () => {
            try {
                const response = await fetch(`${api_url}/api/car/bom-by-ds/DS-456`);
                const data = await response.json();
                setBOMData(data?.parts);
            } catch (error) {
                console.error('Error fetching BOM data:', error);
            }
        };
        fetchBOMData();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Bill of Materials (BOM)</h1>

            {/* BOM Data Table */}
            <table className="table-auto w-full text-left bg-white border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border px-4 py-2">Part Name</th>
                        <th className="border px-4 py-2">Quantity</th>
                        <th className="border px-4 py-2">Cost ($)</th>
                    </tr>
                </thead>
                <tbody>
                    {bomData.map((item) => (
                        <tr key={item._id}>
                            <td className="border px-4 py-2">{item.name}</td>
                            <td className="border px-4 py-2">{item.quantity}</td>
                            <td className="border px-4 py-2">{item.cost}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Export Buttons */}
            <div className="mt-4 flex space-x-4">
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                    onClick={() => exportToCSV(bomData, 'bom-data')}
                >
                    Export to CSV
                </button>
                <button
                    className="bg-green-600 text-white px-4 py-2 rounded-lg"
                    onClick={() => exportToXLSX(bomData, 'bom-data')}
                >
                    Export to XLSX
                </button>
                <button
                    className="bg-red-600 text-white px-4 py-2 rounded-lg"
                    onClick={() => exportToPDF(bomData, 'bom-data')}
                >
                    Export to PDF
                </button>
            </div>
        </div>
    );
};

export default BOMPage;
