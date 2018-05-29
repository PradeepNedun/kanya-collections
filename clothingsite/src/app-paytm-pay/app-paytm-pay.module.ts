import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppPaytmPayComponent } from './app-paytm-pay.component';
import { MaterialModule } from '../app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppPaytmPayComponent
  ],
  imports: [
    MaterialModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports : [
    AppPaytmPayComponent
  ],
  providers: [],
  bootstrap: [AppPaytmPayComponent]
})
export class AppPaytmPayModule { }
