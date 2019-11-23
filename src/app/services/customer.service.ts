import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private http: HttpClient
  ) { }


  getCustomersFromFile() {
    return this.http.get('assets/customers.txt', { responseType: 'text' })
      .pipe(
        map(res => JSON.parse(res))
      );
  }
}


