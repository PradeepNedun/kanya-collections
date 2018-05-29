import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppProductTileComponent } from './app-product-tile.component';
import { MaterialModule } from '../app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppFilterPanelModule } from '../app-filter-panel/app-filter-panel.module';

@NgModule({
  declarations: [
    AppProductTileComponent
  ],
  imports: [
    MaterialModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppFilterPanelModule
  ],
  exports : [
    AppProductTileComponent
  ],
  providers: [],
  bootstrap: [AppProductTileComponent]
})
export class AppProductTileModule { }
