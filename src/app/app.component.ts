import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from './services/customer.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from './interface/customer';
import { DialogService } from './services/dialog.service';
import { Util } from 'sorting-customer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'biz2Credit';
  customers: Customer[];
  // dublin location
  dublin_location = {
    latitude: 53.339428,
    longitude: -6.257664
  }
  filteration_disabled = false;
  invitation_disabled = true;
  util = new Util();

  displayedColumns: string[] = ['user_id', 'name', 'latitude', 'longitude'];
  dataSource: MatTableDataSource<Customer>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public customerService: CustomerService,
    public dialogService: DialogService,
  ) {

  }
  ngOnInit() {
    this.customerService.getCustomersFromFile().subscribe(customers => {
      // Pass sorted array to datasource
      this.customers = customers;
      this.dataSource = new MatTableDataSource<Customer>(this.customers.sort(this.util.sortByUserId));
      this.dataSource.paginator = this.paginator;
    }, error => {
      alert(error);
    });
  }


  /**
   * Sort function to sort array of customers by user_id
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

  /**
   * Filter customers for in 100 km close proximity of Dublin
   */
  filterCustomers() {
    let lat1 = this.dublin_location.latitude;
    let lon1 = this.dublin_location.longitude;
    this.customers = this.customers.filter(customer => {
      let lat2 = parseInt(customer.latitude);
      let lon2 = parseInt(customer.longitude);
      if (this.util.getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) < 100) return true;
    });

    this.dataSource = new MatTableDataSource<Customer>(this.customers.sort(this.util.sortByUserId));
    this.dataSource.paginator = this.paginator;
    this.filteration_disabled = true;
    this.invitation_disabled = false;
  }

  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    let R = 6371;   // Earth Radius(in Km)
    let dLat = this.degree2Radian(lat2 - lat1);
    let dLon = this.degree2Radian(lon2 - lon1);
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.degree2Radian(lat1)) * Math.cos(this.degree2Radian(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  degree2Radian = deg => deg * (Math.PI / 180);

  sendInvite() {
    this.customers.forEach((customer, index) => {
      console.log(`Invitation ${index + 1}: Sent to ${customer.name}`);
      if (this.customers.length === (index + 1)) {
        const message = `Invitation is successfully send to ${this.customers.length} Customers. \n See Browser console for details.`;
        this.dialogService.openInfoDialog(message);
      }
    })
  }
}
