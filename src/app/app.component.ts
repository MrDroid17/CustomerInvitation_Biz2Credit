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
      this.dataSource = new MatTableDataSource<Customer>(customers.sort(this.sortById));
      this.dataSource.paginator = this.paginator;

    })
  }


  /**
   * Sort function to sort array of object by user_id
   * @param a 
   * @param b 
   */
  sortById(a, b) {
    const id1 = a.user_id;
    const id2 = b.user_id;
    let comparison = 0;

    if (id1 > id2) comparison = 1;
    else if (id1 < id2) comparison = -1;

    return comparison;
  }
}
