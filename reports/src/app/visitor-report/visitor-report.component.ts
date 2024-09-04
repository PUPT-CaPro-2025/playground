import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-visitor-report',
  templateUrl: './visitor-report.component.html',
  styleUrl: './visitor-report.component.css'
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
			// ...
		];

		autoTable(doc, {
			head: headers,
			body: data,
			startY: 30, // Adjust the `startY` position as needed.
		});

		// Save the PDF.
		doc.save('table.pdf');
	}
}
