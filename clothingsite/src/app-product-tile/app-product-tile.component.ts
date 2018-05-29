import { Component, Inject, Output, EventEmitter, OnInit } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase';
import 'firebase/storage';
import { Products } from '../app/app.config';
import { AuthService } from '../app/app.auth.service';
import { MatSnackBar } from '@angular/material';
import { element } from 'protractor';
import { Router } from '@angular/router';
import { DataService } from "../app/data.service";

@Component({
  selector: 'app-product-tile',
  templateUrl: './app-product-tile.html',
  styleUrls: ['./app-product-tile.css']
})

export class AppProductTileComponent {
  image: string;
  isBtnActive: boolean;
  products:any[] = Products;
  color: string = 'primary';
  selectedProductAndColor: string;
  selectedSizeAndColor: string;
  productAdded: boolean;
  orderDetails: object;
  productsInCartCount: number;
  productsInCart: Array<object> = [];
  message: string;

  receiveMessage(item) {
    this.products = Products;
    this.products = this.products.filter(
      product => product.filterQuery === item);
  }

  ngOnInit(): void {
    let sessionProductInCart = sessionStorage.getItem("productsInCart");
    if(sessionProductInCart === null) {
        this.productsInCartCount = 0;
    } else {
        this.productsInCartCount = JSON.parse(sessionProductInCart).length;
        this.productsInCart = JSON.parse(sessionProductInCart);
    }
  }

  constructor(@Inject(FirebaseApp) firebaseApp: any, private authService:AuthService, 
  public snackBar: MatSnackBar, private router: Router, private data: DataService) {
    window.scrollTo(0, 0);
    this.loadInitialImageForAllProducts(firebaseApp);
  }

  loadInitialImageForAllProducts(firebaseApp) {
    let flag = true;
    this.products.forEach(eachObj => {
      if(flag) {
        eachObj.mode = 'indeterminate';
      } else {
        eachObj.mode = 'determinate';
      }
      const storageRef = firebaseApp.storage().ref().child('leggings/#000000.jpg');
      storageRef.getDownloadURL().then(url => {
        eachObj.mode = 'determinate';
        eachObj.image = url;
      });
      flag = false;
    });
  }

  getProductImage(product, selectedColor) {
    product.mode = 'indeterminate';
    product.selectedColor = selectedColor;
    this.selectedProductAndColor = product.id + selectedColor;
    var getSelectedColor = firebase.storage().ref().child('leggings/'+ selectedColor +'.jpg');
    getSelectedColor.getDownloadURL().then(
      url => product.image = url).then( () => setTimeout(()=>{
        product.mode = 'determinate';
    },1000));
  }

  setSelectedSize(product, selectedSize) {
    product.selectedSize = selectedSize;
    this.selectedSizeAndColor = product.id + selectedSize;
  }

  addToMyFavorite(product) {
    product.favorite = !product.favorite;
  }

  throwAlertMessage(product) {
    let snackMessage;
    if(!this.authService.isLoggedIn()) {
      let snackBarRef = this.snackBar.open('Please Login to Add Products', 'Login',{
        duration: 2000,
      });
      snackBarRef.onAction().subscribe(() => {
        let smallBox = document.querySelector('#btn_login'); 
        smallBox.dispatchEvent(new Event('click'));
      }); 
    } else if(!product.selectedColor) {
      let snackBarRef = this.snackBar.open('Please Pick your Dress Color', 'dismiss',{
        duration: 2000,
      });
    } else if(!product.selectedSize) {
      let snackBarRef = this.snackBar.open('Please select your Dress Size', 'dismiss',{
        duration: 2000,
      });
    }
  }

  addProductToCart(product) {
    if (this.authService.isLoggedIn() && product.selectedColor && product.selectedSize) {
      let sessionProductInCart = sessionStorage.getItem("productsInCart");
      if(!sessionProductInCart) {
        this.productsInCart = [];
      } else {
        this.productsInCartCount = JSON.parse(sessionProductInCart).length;
        this.productsInCart = JSON.parse(sessionProductInCart);
      }
      this.productAdded = true;
      setTimeout(()=>{
        this.productAdded = false;
      },500);
      this.productsInCartCount = this.productsInCartCount + 1;
      if(this.productsInCart.length == 0) {
        product['quantity'] = 1;
        this.productsInCart.push(product);
      } else {
        let flag = true;
        this.productsInCart.forEach(item => {
          if(item['id'] == product.id && item['selectedColor'] == product.selectedColor && item['selectedSize'] == product.selectedSize) {
            item['quantity'] = item['quantity'] + 1;
          } else {
            if(flag) {
              product['quantity'] = 1;
              this.productsInCart.push(product);
              flag = false;
            }
          }
        });
      }
      sessionStorage.setItem("productsInCart", JSON.stringify(this.productsInCart));
    } else {
        this.throwAlertMessage(product);
    }
  }

  goToShipment() {
    if(this.productsInCartCount > 0) {
      this.router.navigate(['/shipment']);
    } else {
      let snackBarRef = this.snackBar.open('Please add atleast one prodcut', 'dismiss',{
        duration: 2000,
      });
    }
  }

  goToShipping() {
    this.router.navigate(['/shipment']);
  }
}
