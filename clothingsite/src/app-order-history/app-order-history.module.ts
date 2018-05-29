import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppOrderHistoryComponent } from './app-order-history.component';
import { MaterialModule } from '../app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppOrderHistoryComponent
  ],
  imports: [
    MaterialModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports : [
    AppOrderHistoryComponent
  ],
  providers: [],
  bootstrap: [AppOrderHistoryComponent]
})
export class AppOrderHistoryModule { }
