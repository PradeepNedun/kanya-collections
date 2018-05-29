import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatTableDataSource} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { DataService } from "../app/data.service";

@Component({
  selector: 'app-shipping-info',
  templateUrl: './app-shipping-info.html',
  styleUrls: ['./app-shipping-info.css']
})

export class AppShippingInfoComponent {
  finalProducts:any;
  displayedColumns = ['name', 'discountedPrice', 'quantity', 'totalPrice', 'remove'];
  dataSource:any;
  selectedValue: string;
  products:any[];
  promoCode:string;
  productsInCartCount: number = 0;

  constructor(private router: Router, private data: DataService ) {
    window.scrollTo(0, 0);
    if(sessionStorage.getItem("productsInCart")) {
      this.products = JSON.parse(sessionStorage.getItem("productsInCart"));
      this.productsInCartCount = this.products.length;
      this.products.forEach(element => {
        element['totalPrice'] = element.quantity * parseInt(element.discountedPrice);
        element['remove'] = false;
      });
      this.dataSource = new MatTableDataSource(this.products); 
    } else {
      this.products = [];
    }
  }

  updatePrice(element, quantity) {
    let products = JSON.parse(sessionStorage.getItem("productsInCart"));
    for(var i=0 ; i < products.length; i++) {
      if(element.id === products[i].id) {
        products[i].quantity = quantity;
      }
    }
    sessionStorage.setItem("productsInCart", JSON.stringify(products));
    element['totalPrice'] = quantity * parseInt(element.discountedPrice);
  }
  
  removeItem(itemToRemove) {
    this.products = this.products.filter(element => {
      if(element !== itemToRemove) {
        return element;
      }
    });
    sessionStorage.setItem("productsInCart", JSON.stringify(this.products));
    if(sessionStorage.getItem("productsInCart")) {
      this.productsInCartCount = JSON.parse(sessionStorage.getItem("productsInCart")).length;
    } else {
      this.productsInCartCount= 0;
    }
    this.dataSource = new MatTableDataSource(this.products); 
  }

  validatePromo(){
    console.log(this.promoCode);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  goToCustomer() {
    let products = JSON.parse(sessionStorage.getItem("productsInCart"));
    var price = 0;
    for(var i=0 ; i< products.length; i++) {
      price = price + (parseInt(products[i].quantity) * parseInt(products[i].discountedPrice));
    }
    sessionStorage.setItem('kcAmount', price.toString());
    this.router.navigate(['/customer']);
  }
}


