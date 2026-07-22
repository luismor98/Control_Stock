import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/**
 * Genera y descarga un reporte PDF con tabla.
 * @param {Object} options 
 * @param {string} options.title - Título del documento.
 * @param {string} options.filename - Nombre del archivo a descargar.
 * @param {Array<string>} options.headers - Array con los nombres de las columnas.
 * @param {Array<Array<any>>} options.rows - Array bidimensional con los datos de cada fila.
 */
export const generatePDFReport = ({ title, filename, headers, rows }) => {
  // Crear instancia en formato horizontal (landscape) si hay muchas columnas
  // Para 5-6 columnas, 'portrait' suele ser suficiente, pero 'landscape' da más margen.
  const doc = new jsPDF({ orientation: "portrait" });

  // Fecha actual formateada
  const dateStr = new Date().toLocaleString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Título del reporte
  doc.setFontSize(18);
  doc.setTextColor(30, 41, 59); // slate-800
  doc.text(title, 14, 22);

  // Membrete / Subtítulo con fecha
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139); // slate-500
  doc.text(`Generado el: ${dateStr}`, 14, 30);

  // Generar la tabla automática con estilo Premium usando la función directamente
  autoTable(doc, {
    startY: 38,
    head: [headers],
    body: rows,
    theme: "grid",
    headStyles: {
      fillColor: [79, 70, 229], // Indigo 600 (color primario de la app)
      textColor: [255, 255, 255],
      fontStyle: "bold",
      halign: "center",
    },
    bodyStyles: {
      textColor: [51, 65, 85], // slate-700
      fontSize: 9,
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252], // slate-50
    },
    styles: {
      cellPadding: 4,
      overflow: "linebreak",
    },
    columnStyles: {
      0: { halign: "center" }, // Ej. ID o Fecha suele ir centrado
    },
  });

  // Descargar el archivo
  doc.save(`${filename}_${new Date().getTime()}.pdf`);
};
