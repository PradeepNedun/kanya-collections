import { NgModule } from '@angular/core';
import { AppFilterPanelComponent } from './app-filter-panel.component';
import { MaterialModule } from '../app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppFilterPanelComponent
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
    AppFilterPanelComponent
  ],
  providers: [],
  bootstrap: [AppFilterPanelComponent]
})
export class AppFilterPanelModule { }
