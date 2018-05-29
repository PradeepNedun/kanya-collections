import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppHeaderModule } from '../app-header/app-header.module';
import { AppProductTileModule } from '../app-product-tile/app-product-tile.module';
import { AppshippingInfoModule } from '../app-shipping-info/app-shipping-info.module';
import { AppCustomerInfoModule } from '../app-customer-info/app-customer-info.module';
import { AppOrderHistoryModule } from '../app-order-history/app-order-history.module';
import { AppPaytmPayModule } from '../app-paytm-pay/app-paytm-pay.module';
import { AppFooterModule } from '../app-footer/app-footer.module';

import { AppComponent } from './app.component';
import { AppProductTileComponent } from '../app-product-tile/app-product-tile.component';
import { AppShippingInfoComponent } from '../app-shipping-info/app-shipping-info.component';
import { AppCustomerInfoComponent } from '../app-customer-info/app-customer-info.component';
import { AppOrderHistoryComponent } from '../app-order-history/app-order-history.component';
import { AppPaytmPayComponent } from '../app-paytm-pay/app-paytm-pay.component';
import { AppFooterComponent } from '../app-footer/app-footer.component';

import { AuthService } from './app.auth.service';
import { DataService } from './data.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';

import { Routes } from '@angular/router';
const appRoutes: Routes = [
  { path: 'home', component: AppProductTileComponent },
  { path: 'shipment',  component: AppShippingInfoComponent },
  { path: 'customer', component: AppCustomerInfoComponent },
  { path: 'orders', component: AppOrderHistoryComponent },
  { path: 'payment', component: AppPaytmPayComponent },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
  //{ path: '**', component: PageNotFoundComponent }
]
export const firebaseConfig = {
  apiKey: "AIzaSyBM_Qo6mrqF1zXv7CxRpNefgMHbeJHLmtI",
  authDomain: "kanya-collections.firebaseapp.com",
  databaseURL: "https://kanya-collections.firebaseio.com",
  projectId: "kanya-collections",
  storageBucket: "kanya-collections.appspot.com",
  messagingSenderId: "810886376016"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpModule,
    AppHeaderModule,
    AppProductTileModule,
    AppshippingInfoModule,
    AppCustomerInfoModule,
    AppOrderHistoryModule,
    AppPaytmPayModule,
    AppFooterModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
  ],
  exports: [
  ],
  providers: [AuthService, DataService, AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
