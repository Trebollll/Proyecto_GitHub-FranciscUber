import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReportService, ReportRow } from 'src/app/services/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage {
  rangeForm = this.fb.group({
    from: ['', Validators.required],
    to: ['', Validators.required],
  });

  reportData: ReportRow[] = [];

  constructor(private fb: FormBuilder, private reportSvc: ReportService) {}

  async loadReport() {
    const { from, to } = this.rangeForm.value;
    this.reportData = await this.reportSvc.getByDateRange(
      new Date(from),
      new Date(to)
    );
  }

  export(format: 'excel' | 'pdf') {
    if (format === 'excel') {
      this.reportSvc.exportToExcel(this.reportData);
    } else {
      this.reportSvc.exportToPdf(this.reportData);
    }
  }
}
