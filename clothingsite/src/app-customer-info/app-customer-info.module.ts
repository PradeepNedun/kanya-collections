import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppCustomerInfoComponent } from './app-customer-info.component';
import { MaterialModule } from '../app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogOverviewSuccess } from './app-customer-info.component';
import { DialogOverviewFailure } from './app-customer-info.component';
import { DialogFavAddress } from './app-customer-info.component';

@NgModule({
  declarations: [
    AppCustomerInfoComponent,
    DialogOverviewSuccess,
    DialogOverviewFailure,
    DialogFavAddress
  ],
  imports: [
    MaterialModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports : [
    AppCustomerInfoComponent
  ],
  providers: [],
  bootstrap: [AppCustomerInfoComponent, DialogOverviewSuccess, DialogOverviewFailure, DialogFavAddress]
})
export class AppCustomerInfoModule { }
