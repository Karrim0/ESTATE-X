// src/utils/export.js

import { EXPORT_FORMATS } from "../data/constants";

// ==================== CSV EXPORT ====================

/**
 * Convert array of objects to CSV
 * @param {Array} data - Array of objects
 * @param {Array} columns - Column definitions
 * @returns {string} CSV string
 */
export const arrayToCSV = (data, columns) => {
  if (!data || data.length === 0) return "";

  // Use provided columns or extract from first object
  const headers = columns || Object.keys(data[0]);

  // Create header row
  const headerRow = headers.map((h) => `"${h}"`).join(",");

  // Create data rows
  const dataRows = data.map((row) => {
    return headers
      .map((header) => {
        const value = row[header];

        // Handle different data types
        if (value === null || value === undefined) return '""';
        if (typeof value === "object") return `"${JSON.stringify(value)}"`;
        if (typeof value === "string" && value.includes(","))
          return `"${value}"`;

        return `"${value}"`;
      })
      .join(",");
  });

  return [headerRow, ...dataRows].join("\n");
};

/**
 * Download CSV file
 * @param {Array} data - Data array
 * @param {string} filename - File name
 * @param {Array} columns - Column definitions
 */
export const downloadCSV = (data, filename = "export.csv", columns = null) => {
  const csv = arrayToCSV(data, columns);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");

  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// ==================== JSON EXPORT ====================

/**
 * Download JSON file
 * @param {Object|Array} data - Data to export
 * @param {string} filename - File name
 */
export const downloadJSON = (data, filename = "export.json") => {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json;charset=utf-8;" });
  const link = document.createElement("a");

  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// ==================== PDF EXPORT (Mock) ====================

/**
 * Export to PDF (requires library like jsPDF)
 * @param {Object} options - Export options
 */
export const exportToPDF = async (options = {}) => {
  const { title = "Export", data = [], filename = "export.pdf" } = options;

  // This is a placeholder - in production, use jsPDF or similar
  console.log("PDF Export:", { title, data, filename });

  // Show message to user
  alert("PDF export functionality requires jsPDF library. This is a demo.");

  // Example with jsPDF (uncomment when library is added):
  /*
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  doc.setFontSize(20);
  doc.text(title, 20, 20);
  
  doc.setFontSize(12);
  let yPos = 40;
  
  data.forEach((item, index) => {
    doc.text(`${index + 1}. ${JSON.stringify(item)}`, 20, yPos);
    yPos += 10;
    
    if (yPos > 280) {
      doc.addPage();
      yPos = 20;
    }
  });
  
  doc.save(filename);
  */
};

// ==================== EXCEL EXPORT (Mock) ====================

/**
 * Export to Excel (requires library like XLSX)
 * @param {Array} data - Data array
 * @param {string} filename - File name
 * @param {string} sheetName - Sheet name
 */
export const exportToExcel = (
  data,
  filename = "export.xlsx",
  sheetName = "Sheet1"
) => {
  // This is a placeholder - in production, use SheetJS (XLSX) or similar
  console.log("Excel Export:", { data, filename, sheetName });

  // Fallback to CSV
  downloadCSV(data, filename.replace(".xlsx", ".csv"));

  // Example with XLSX (uncomment when library is added):
  /*
  const XLSX = window.XLSX;
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, filename);
  */
};

// ==================== PROPERTIES EXPORT ====================

/**
 * Export properties to specified format
 * @param {Array} properties - Properties array
 * @param {string} format - Export format (csv, json, pdf, xlsx)
 * @param {string} filename - File name
 */
export const exportProperties = (
  properties,
  format = "csv",
  filename = null
) => {
  const timestamp = new Date().toISOString().split("T")[0];
  const defaultFilename = `properties_${timestamp}`;

  // Define columns for properties export
  const columns = [
    "id",
    "title",
    "location",
    "country",
    "city",
    "price",
    "type",
    "beds",
    "baths",
    "sqft",
    "rating",
    "views",
    "status",
  ];

  // Clean data for export
  const cleanData = properties.map((p) => ({
    id: p.id,
    title: p.title,
    location: p.location,
    country: p.country,
    city: p.city,
    price: p.price,
    type: p.type,
    beds: p.beds,
    baths: p.baths,
    sqft: p.sqft,
    rating: p.rating || "N/A",
    views: p.views || 0,
    status: p.status,
  }));

  switch (format.toLowerCase()) {
    case EXPORT_FORMATS.CSV:
      downloadCSV(cleanData, `${filename || defaultFilename}.csv`, columns);
      break;
    case EXPORT_FORMATS.PDF:
      exportToPDF({
        title: "Properties Export",
        data: cleanData,
        filename: `${filename || defaultFilename}.pdf`,
      });
      break;
    case EXPORT_FORMATS.EXCEL:
      exportToExcel(
        cleanData,
        `${filename || defaultFilename}.xlsx`,
        "Properties"
      );
      break;
    default:
      downloadJSON(cleanData, `${filename || defaultFilename}.json`);
  }
};

// ==================== ANALYTICS EXPORT ====================

/**
 * Export analytics data
 * @param {Object} analyticsData - Analytics data
 * @param {string} format - Export format
 */
export const exportAnalytics = (analyticsData, format = "csv") => {
  const timestamp = new Date().toISOString().split("T")[0];
  const filename = `analytics_${timestamp}`;

  switch (format.toLowerCase()) {
    case EXPORT_FORMATS.CSV:
      // Convert analytics object to array format
      const dataArray = Object.entries(analyticsData).map(([key, value]) => ({
        metric: key,
        value: typeof value === "object" ? JSON.stringify(value) : value,
      }));
      downloadCSV(dataArray, `${filename}.csv`);
      break;
    case EXPORT_FORMATS.PDF:
      exportToPDF({
        title: "Analytics Report",
        data: analyticsData,
        filename: `${filename}.pdf`,
      });
      break;
    default:
      downloadJSON(analyticsData, `${filename}.json`);
  }
};

// ==================== PRINT ====================

/**
 * Print current page
 */
export const printPage = () => {
  window.print();
};

/**
 * Print specific element
 * @param {string} elementId - Element ID to print
 */
export const printElement = (elementId) => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with ID ${elementId} not found`);
    return;
  }

  const printWindow = window.open("", "", "height=600,width=800");
  printWindow.document.write("<html><head><title>Print</title>");
  printWindow.document.write("</head><body>");
  printWindow.document.write(element.innerHTML);
  printWindow.document.write("</body></html>");
  printWindow.document.close();
  printWindow.print();
};

// ==================== SHARE ====================

/**
 * Share data via Web Share API
 * @param {Object} data - Data to share
 * @returns {Promise<boolean>} Success status
 */
export const shareData = async (data) => {
  if (!navigator.share) {
    console.warn("Web Share API not supported");
    return false;
  }

  try {
    await navigator.share(data);
    return true;
  } catch (error) {
    console.error("Share failed:", error);
    return false;
  }
};

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Success status
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error("Copy failed:", error);

    // Fallback method
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.select();

    try {
      document.execCommand("copy");
      document.body.removeChild(textArea);
      return true;
    } catch (err) {
      document.body.removeChild(textArea);
      return false;
    }
  }
};

export default {
  arrayToCSV,
  downloadCSV,
  downloadJSON,
  exportToPDF,
  exportToExcel,
  exportProperties,
  exportAnalytics,
  printPage,
  printElement,
  shareData,
  copyToClipboard,
};
