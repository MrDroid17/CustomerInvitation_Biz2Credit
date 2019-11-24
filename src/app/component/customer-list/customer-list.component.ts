import { Component, OnInit, ViewChild, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Customer } from 'src/app/interface/customer';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Util } from 'sorting-customer';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnChanges {
  @Input() customers: Customer[];
  displayedColumns: string[] = ['user_id', 'name', 'latitude', 'longitude'];
  dataSource: MatTableDataSource<Customer>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  util = new Util();

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    this.customers = changes.customers.currentValue;
    if (this.customers) {
      this.customers.sort(this.util.sortByUserId);
    }
    this.dataSource = new MatTableDataSource<Customer>(this.customers);
    this.dataSource.paginator = this.paginator;
  }

}
