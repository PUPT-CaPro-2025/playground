import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-visitor-report',
  templateUrl: './visitor-report.component.html',
  styleUrls: ['./visitor-report.component.css']
})
export class VisitorReportComponent {

  generatePDF() {
    // Create a new PDF document.
    const doc = new jsPDF();

    // Add content to the PDF.
    doc.setFontSize(16);
    doc.text('My Angular PDF Generator', 10, 10);
    doc.setFontSize(12);
    doc.text(
      'This is a comprehensive guide on generating PDFs with Angular.',
      10,
      20,
    );

    // Create a table using `jspdf-autotable`.
    const headers = [['Name', 'Email', 'Country']];
    const data = [
      ['David', 'david@example.com', 'Sweden'],
      ['Castille', 'castille@example.com', 'Spain'],
      // Add more data as needed
    ];

    autoTable(doc, {
      head: headers,
      body: data,
      startY: 30, // Adjust the `startY` position as needed.
    });

    // Get the PDF data as a Blob.
    const pdfBlob = doc.output('blob');

    // Create a URL for the Blob and open it in a new window.
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl);
  }
}
