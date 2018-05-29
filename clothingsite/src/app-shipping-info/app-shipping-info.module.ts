import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppShippingInfoComponent } from './app-shipping-info.component';
import { MaterialModule } from '../app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppShippingInfoComponent
  ],
  imports: [
    MaterialModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports : [
    AppShippingInfoComponent
  ],
  providers: [],
  bootstrap: [AppShippingInfoComponent]
})
export class AppshippingInfoModule { }
