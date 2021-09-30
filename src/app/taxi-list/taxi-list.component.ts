import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data/data-service.service';

@Component({
  selector: 'app-taxi-list',
  templateUrl: './taxi-list.component.html',
  styleUrls: ['./taxi-list.component.css'],
})
export class TaxiListComponent implements OnInit {
  taxis: any[];

  constructor(private dataService: DataServiceService) {
    this.taxis = [];
  }

  ngOnInit(): void {
    this.dataService.getTaxiList().subscribe((res) => {
      const headers = res.fields;
      this.taxis = res.records.map((r: any) =>
        r.reduce((p: any, x: any, i: number) => {
          const next = { ...p };
          next[headers[i].id] = x;
          return next;
        }, {})
      );
    });
  }
}
