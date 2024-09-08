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
		// Create a new PDF document in landscape mode.
		const doc = new jsPDF('landscape', 'mm', 'a4');

		// Center the title for the document.
		const title = 'Polytechnic University of the Philippines';
		const branch = 'TAGUIG BRANCH';
		const address = 'Gen. Santos Avenue, Lower Bicutan, Taguig City';
		const pageWidth = doc.internal.pageSize.getWidth();
		doc.setFontSize(18);
		doc.text(title, pageWidth / 2, 10, { align: 'center' });
		doc.setFontSize(14);
		doc.text(branch, pageWidth / 2, 18, { align: 'center' });
		doc.setFontSize(12);
		doc.text(address, pageWidth / 2, 24, { align: 'center' });

		// Set the document header details.
		doc.setFontSize(10);

		doc.text('CLIENTS LOGBOOK', 10, 32);
		doc.text('Sector: DOST Laboratory', 10, 38);
		doc.text('College/Office: DOST Laboratory', 10, 44);
    doc.text('Date/Time Printed: September 4, 2024 10:00 pm', 10, 50); // Added date/time printed
		// Create the table using `jspdf-autotable`.
		const headers = [
			['NAME OF CLIENT', 'DATE OF VISIT', 'TIME IN', 'TIME OUT', 'VISITOR DETAILS', 'CONTACT DETAILS', 'PURPOSE OF VISIT'],
		];
		const data = [
			['DEL ROSARIO, PAUL FRANC', '2015-08-12', '08:00:00', '00:00:00', 'CS', '09399079102', 'Project Testing'],
			['PRADILLA, KYLE', '2015-08-12', '08:00:00', '00:00:00', 'CS', '09276107044', 'Project Testing'],
			['PRADILLA, KYLE', '2015-08-18', '08:07:46', '00:00:00', 'Computer Society', '09276107044', 'Project Testing'],
			// Continue adding rows as needed.
		];

		autoTable(doc, {
			head: headers,
			body: data,
			startY: 60, // Adjusted start position of the table.
			styles: { fontSize: 10 }, // General style for the table
			theme: 'grid', // Table theme
			columnStyles: {
				0: { cellWidth: 40 }, // Adjust the width of the first column
				1: { cellWidth: 25 }, // Adjust the width of the second column
				2: { cellWidth: 25 }, // Adjust the width of the third column
				3: { cellWidth: 25 }, // Adjust the width of the fourth column
				4: { cellWidth: 35 }, // Adjust the width of the fifth column
				5: { cellWidth: 40 }, // Adjust the width of the sixth column
				6: { cellWidth: 60 }, // Adjust the width of the seventh column
			},
			didDrawPage: (data) => {
				// Footer text
				doc.setFontSize(10);
				doc.text(
					'Verified by: ________________________',
					data.settings.margin.left,
					doc.internal.pageSize.getHeight() - 20
				);
				doc.text('Certified true copy', data.settings.margin.left, doc.internal.pageSize.getHeight() - 10);
			},
		});

		// Generate the PDF as a Blob.
		const pdfBlob = doc.output('blob');

		// Create a URL for the Blob.
		const pdfUrl = URL.createObjectURL(pdfBlob);

		// Open the PDF in a new tab/window.
		const newWindow = window.open(pdfUrl, '_blank');

		// Clean up the object URL after the PDF has been opened.
		if (newWindow) {
			newWindow.onload = () => URL.revokeObjectURL(pdfUrl);
		}
	}
}
