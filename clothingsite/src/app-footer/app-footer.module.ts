import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppFooterComponent, FooterHomeSuccess, FooterPolicySuccess, FooterContactSuccess } from './app-footer.component';
import { MaterialModule } from '../app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppFooterComponent,
    FooterHomeSuccess,
    FooterPolicySuccess,
    FooterContactSuccess
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
    AppFooterComponent
  ],
  providers: [],
  bootstrap: [AppFooterComponent, FooterHomeSuccess, FooterPolicySuccess, FooterContactSuccess]
})
export class AppFooterModule { }
