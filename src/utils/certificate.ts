import { jsPDF } from 'jspdf';

export const generateCertificate = (userName: string, courseTitle: string, date: string) => {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  // Background
  doc.setFillColor(15, 15, 25);
  doc.rect(0, 0, 297, 210, 'F');

  // Border
  doc.setDrawColor(0, 178, 255);
  doc.setLineWidth(2);
  doc.rect(10, 10, 277, 190);

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(40);
  doc.setFont('helvetica', 'bold');
  doc.text('CERTIFICATE', 148.5, 50, { align: 'center' });
  
  doc.setFontSize(20);
  doc.text('OF COMPLETION', 148.5, 65, { align: 'center' });

  // Body
  doc.setFontSize(16);
  doc.setFont('helvetica', 'normal');
  doc.text('This is to certify that', 148.5, 90, { align: 'center' });

  doc.setTextColor(0, 178, 255);
  doc.setFontSize(30);
  doc.setFont('helvetica', 'bold');
  doc.text(userName.toUpperCase(), 148.5, 110, { align: 'center' });

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'normal');
  doc.text('has successfully completed the course', 148.5, 130, { align: 'center' });

  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text(courseTitle, 148.5, 150, { align: 'center' });

  // Date
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Issued on: ${date}`, 148.5, 175, { align: 'center' });

  // Signature area (Stellar Tip Jar)
  doc.setDrawColor(255, 255, 255);
  doc.line(110, 190, 187, 190);
  doc.setFontSize(10);
  doc.text('Authorized by Stellar Tip Jar', 148.5, 195, { align: 'center' });

  // Save the PDF
  doc.save(`Certificate_${courseTitle.replace(/\s+/g, '_')}.pdf`);
};
