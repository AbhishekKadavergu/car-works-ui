import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

export const exportToCSV = (data, filename) => {
    const csvContent = data.map(item => Object.values(item).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.csv`;
    link.click();
};

export const exportToXLSX = (data, filename) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, `${filename}.xlsx`);
};

export const exportToPDF = (data, filename) => {
    const doc = new jsPDF();
    const tableColumn = Object.keys(data[0]);
    const tableRows = data.map(item => Object.values(item));

    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
    });

    doc.save(`${filename}.pdf`);
};
