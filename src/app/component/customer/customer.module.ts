import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerItemComponent } from './customer-item/customer-item.component';
import { CustomerComponent } from './customer.component';



@NgModule({
  declarations: [
    CustomerItemComponent,
    CustomerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CustomerModule { }
