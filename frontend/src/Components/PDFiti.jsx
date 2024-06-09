import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Classes from '../Styles/Generatedplan.module.css';

const PDFiti = ({ generatedPlan }) => {
    const handleDownloadPDF = async () => {
        try {
          const element = document.getElementById("itinerary-content");
          const destination = localStorage.getItem("destination");
          
          console.log(destination);
          if (!element) {
            console.error("Element with ID 'itinerary-content' not found.");
            return;
          }
    
        if (!destination) {
          const destination = prompt("Enter the PDF file name (without extension):");
            return;
          }
    
          const pdf = new jsPDF({
            orientation: "portrait",
            unit: "pt", // Use points as the unit
            format: "a4", // Use A4 size
          });
    
          const margin = 20;
          const rowHeight = 20;
    
          let yPosition = margin;
    
          // Define table headers
          const headers = ["Day", "Travel Plan"];
    
          // Initialize variables to track current day and travel plan
          let currentDay = "";
          let currentPlan = "";
    
          // Split the text content into lines
          const textContent = generatedPlan.split("\n");
    
          // Add table headers with custom styles
          pdf.autoTable({
            startY: yPosition,
            head: [headers],
            theme: "grid",
            styles: { lineWidth: 0.5 }, // Set border line width
            headStyles: { fillColor: [192, 192, 192] }, // Set header background color
          });
    
          yPosition += rowHeight;
    
          // Iterate through each line of the generated plan
          for (let line of textContent) {
            // Remove excess '*' symbols
            line = line.replace(/\*/g, "");
            let x = 0;
            // Check if the line contains 'Day X' pattern
            if (line.match(/Day \d+/)) {
              // Extract day number
              x++;
              currentDay = `Day ${x}`;
              continue; // Skip to next iteration
            }
    
            // Check if the line contains 'Safety Tips' pattern
    
            // Check for keywords indicating time of day
            if (line.includes("morning")) {
              // Add current day and plan to the table
              pdf.autoTable({
                startY: yPosition,
                body: [[currentDay, currentPlan]],
                theme: "grid",
                styles: { lineWidth: 0.5 }, // Set border line width
                bodyStyles: { fillColor: [255, 255, 255] }, // Set body background color
              });
              yPosition += rowHeight;
    
              // Reset current plan
              currentPlan = "";
            } else if (line.includes("afternoon") || line.includes("evening")) {
              // Add current day and plan to the table
              pdf.autoTable({
                startY: yPosition,
                body: [[, currentPlan]],
                theme: "grid",
                styles: { lineWidth: 0.5 }, // Set border line width
                bodyStyles: { fillColor: [255, 255, 255] }, // Set body background color
              });
              yPosition += rowHeight;
    
              // Reset current plan
              currentPlan = "";
            }
    
            // Append the cleaned line to the current plan
            currentPlan += line + "\n";
          }
    
          // Add the last day and plan to the table
          pdf.autoTable({
            startY: yPosition,
            body: [[currentDay, currentPlan]],
            theme: "grid",
            styles: { lineWidth: 0.5 }, // Set border line width
            bodyStyles: { fillColor: [255, 255, 255] }, // Set body background color
          });
    
          // Save the PDF file with the provided file name
        //   pdf.save(`${fileName}.pdf`);
        pdf.save(`${destination}.pdf`);
        } catch (error) {
          console.error("Error generating PDF:", error);
        }
      };

  return (
    <button onClick={handleDownloadPDF} className={Classes.pdfButton}>
      Download as PDF
    </button>
  );
};

export default PDFiti;
