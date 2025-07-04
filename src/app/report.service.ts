import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export interface ReportRow {
  id: number;
  titulo: string;
  fecha: Date;
  descripcion: string;
}

@Injectable({ providedIn: 'root' })
export class ReportService {
  async getByDateRange(from: Date, to: Date): Promise<ReportRow[]> {
    const mockData: ReportRow[] = [
      {
        id: 1,
        titulo: 'Evento 1',
        fecha: new Date('2025-07-01'),
        descripcion: 'Descripción 1',
      },
      {
        id: 2,
        titulo: 'Evento 2',
        fecha: new Date('2025-07-02'),
        descripcion: 'Descripción 2',
      },
    ];

    return mockData.filter((item) => {
      const f = new Date(item.fecha).getTime();
      return f >= from.getTime() && f <= to.getTime();
    });
  }

  exportToExcel(data: ReportRow[]) {
    const ws = XLSX.utils.json_to_sheet(
      data.map((item) => ({
        ID: item.id,
        Título: item.titulo,
        Fecha: item.fecha.toLocaleDateString(),
        Descripción: item.descripcion,
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Reporte');
    XLSX.writeFile(wb, `reporte_${Date.now()}.xlsx`);
  }

  exportToPdf(data: ReportRow[]) {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Reporte de Eventos', 20, 20);

    autoTable(doc, {
      startY: 30,
      head: [['ID', 'Título', 'Fecha', 'Descripción']],
      body: data.map((item) => [
        item.id,
        item.titulo,
        item.fecha.toLocaleDateString(),
        item.descripcion,
      ]),
    });

    doc.save(`reporte_${Date.now()}.pdf`);
  }
}
