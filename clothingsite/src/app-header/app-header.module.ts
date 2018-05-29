import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppHeaderComponent } from './app-header.component';
import { MaterialModule } from '../app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppHeaderComponent
  ],
  imports: [
    MaterialModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  exports : [
    AppHeaderComponent
  ],
  providers: [],
  bootstrap: [AppHeaderComponent]
})
export class AppHeaderModule { }
