import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from './services/customer.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from './interface/customer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'biz2Credit';
  customer: Customer[];

  displayedColumns: string[] = ['user_id', 'name', 'latitude', 'longitude'];
  dataSource: MatTableDataSource<Customer>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public customerService: CustomerService
  ) {

  }
  ngOnInit() {
    this.customerService.getCustomersFromFile().subscribe(customers => {
      this.dataSource = new MatTableDataSource<Customer>(customers);
      this.dataSource.paginator = this.paginator;

    })
  }
}
