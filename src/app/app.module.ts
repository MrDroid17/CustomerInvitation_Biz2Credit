import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatPaginatorModule, MatButtonModule, MatIconModule, MatDialogModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { CustomerService } from './services/customer.service';
import { InfoDialogComponent } from './reusable-component/info-dialog/info-dialog.component';
import { DialogService } from './services/dialog.service';
import { CustomerListComponent } from './component/customer-list/customer-list.component';
import { CustomerCountComponent } from './component/customer-count/customer-count.component';

@NgModule({
  declarations: [
    AppComponent,
    InfoDialogComponent,
    CustomerListComponent,
    CustomerCountComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule
  ],
  providers: [
    CustomerService,
    DialogService
  ],
  entryComponents: [
    InfoDialogComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
