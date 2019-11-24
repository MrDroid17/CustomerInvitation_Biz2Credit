import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  CUSTOMER_FILE_PATH: string = 'assets/customers.txt';

  constructor(
    private http: HttpClient
  ) { }


  getCustomersFromFile() {
    return this.http.get(this.CUSTOMER_FILE_PATH, { responseType: 'text' })
      .pipe(
        map(res => JSON.parse(res))
      );
  }
}


