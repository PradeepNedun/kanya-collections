import {Component, Inject} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators, NgForm} from '@angular/forms';
import {MatTableDataSource} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { DataService } from "../app/data.service";
import { AuthService } from '../app/app.auth.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'dialog-success',
  template: `<h3 class="dialog-status">Order Completed Success !!</h3>
             <p class="dialog-payment-msg">Make paytm on a click away or You can even do later..</p>`,
  styleUrls: ['./app-customer-info.css']
})
export class DialogOverviewSuccess {

  constructor(private router:Router,
    public dialogRef: MatDialogRef<DialogOverviewSuccess>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-failure',
  template: `<h3 class="dialog-status">Something went wrong !!</h3>
             <p class="dialog-payment-msg">We will get in touch with you for order. Thanks !</p>`,
  styleUrls: ['./app-customer-info.css']
})
export class DialogOverviewFailure {

  constructor(private router:Router,
    public dialogRef: MatDialogRef<DialogOverviewFailure>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'fav-adress',
  template: `
            <div *ngIf="data">
             <h3 class="dialog-status">Saved Address</h3>
             <br/>
             <p class="dialog-payment-msg">{{data.door}}</p>
             <p class="dialog-payment-msg">{{data.apt}}</p>
             <p class="dialog-payment-msg">{{data.street}}</p>
             <p class="dialog-payment-msg">{{data.area}}</p>
             <p class="dialog-payment-msg">{{data.city}}</p>
             <p class="dialog-payment-msg">{{data.pinCode}}
             <p class="dialog-payment-msg">{{data.phone}}</p>
             <br/>
             <button mat-button mat-dialog-close>Cancel</button>
             <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Use this Address</button>
             </div>
             <div *ngIf="!data">
             <h3 class="dialog-status">Saved Address</h3>
             <br/>
             <p class="dialog-payment-msg">No Address Saved yet</p>
             </div>
             `,
  styleUrls: ['./app-customer-info.css']
})
export class DialogFavAddress {

  constructor(private router:Router,
    public dialogRef: MatDialogRef<DialogFavAddress>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-cusomter-info',
  templateUrl: './app-customer-info.html',
  styleUrls: ['./app-customer-info.css']
})

export class AppCustomerInfoComponent {
  addressForm = new FormGroup({});
  user :any;
  productsInCartCount: number = 0;
  productsInCart: any = {};
  mode :string;
  color: string = 'primary';

  ngOnInit(){
    //called after the constructor and called  after the first ngOnChanges() 
  }

  constructor(public dialog: MatDialog, private data: DataService, private authService:AuthService, public snackBar: MatSnackBar, private router:Router) {
    window.scrollTo(0, 0);
    this.mode = 'determinate';
    if(sessionStorage.getItem("productsInCart")) {
      this.productsInCart = JSON.parse(sessionStorage.getItem("productsInCart"));
      this.productsInCartCount = this.productsInCart.length;
    }
    let startsWith = "firebase:authUser";
    let lskey;
    let phoneNumber;
    Object.keys(localStorage) 
        .forEach(function(key) { 
            if (key.substring(0,startsWith.length) == startsWith) {
              lskey = key;
            } 
        });
    this.user = JSON.parse(localStorage.getItem(lskey)) || {};
    if(this.user == {}) {
      this.user.displayName = '';
      this.user.email = '';
      this.user.phoneNumber = '';
    }
    this.addressForm = new FormGroup({
      'name' : new FormControl(this.user.displayName, [Validators.required]),
      'door' : new FormControl('', [Validators.required]),
      'street': new FormControl('', [Validators.required]),
      'apt': new FormControl(''),
      'area': new FormControl('', [Validators.required]),
      'city': new FormControl('', [Validators.required]),
      'pinCode': new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
      'email': new FormControl(this.user.email, [Validators.required, Validators.email]),
      'phone': new FormControl(this.user.phoneNumber, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      'phoneCode' : new FormControl({value: '+91', disabled: true}, [Validators.required]),
      'favoriteAddress': new FormControl({value: true})
    });
  }

  openDialog(): void {
    let dat = this.data.getItemsFromFirebase().valueChanges().subscribe(action => {
      let arr = [];
      for(var obj in action) {
        if(action[obj]['CustomerInfo']['email'] === this.user.email) {
          arr.push(action[obj]);
        }
      }
      if(arr.length !== 0) {
        var counter = arr.length;
        for(var obj in arr) {
            let dialogRef = this.dialog.open(DialogFavAddress, {
              width: '400px',
              data: arr[obj]['CustomerInfo']
            });
            dialogRef.afterClosed().subscribe(result => {
              counter--;
              console.log('The dialog was closed', result, counter);
              if(result) {
                console.log(arr[counter]['CustomerInfo']);
                this.addressForm = new FormGroup({
                  'name' : new FormControl(this.user.displayName, [Validators.required]),
                  'door' : new FormControl(arr[counter]['CustomerInfo']['door'], [Validators.required]),
                  'street': new FormControl(arr[counter]['CustomerInfo']['street'], [Validators.required]),
                  'apt': new FormControl(arr[counter]['CustomerInfo']['apt']),
                  'area': new FormControl(arr[counter]['CustomerInfo']['area'], [Validators.required]),
                  'city': new FormControl(arr[counter]['CustomerInfo']['city'], [Validators.required]),
                  'pinCode': new FormControl(arr[counter]['CustomerInfo']['pinCode'], [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
                  'email': new FormControl(this.user.email, [Validators.required, Validators.email]),
                  'phone': new FormControl(arr[counter]['CustomerInfo']['phone'], [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
                  'phoneCode' : new FormControl({value: '+91', disabled: true}, [Validators.required]),
                  'favoriteAddress': new FormControl({value: true})
                });
              }
            });
        }
      } else {
        let dialogRef = this.dialog.open(DialogFavAddress, {
          width: '400px',
          data: ""
        });
      }
    });
    
  }

  openDialogSuccess() {
    let dialogRef = this.dialog.open(DialogOverviewSuccess);
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/payment']);
    });
  }

  openDialogFailure() {
    let dialogRef = this.dialog.open(DialogOverviewFailure);
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/home']);
    });
  }

  getNameErrorMessage() {
    return this.addressForm.controls.name.errors.required ? 'You must enter 3 Characters' : '';
  }

  getDoorErrorMessage() {
    return this.addressForm.controls.door.errors.required ? 'You must enter a value' : '';
  }

  getStreetErrorMessage() {
    return this.addressForm.controls.street.errors.required ? 'You must enter a value' : '';
  }

  getAreaErrorMessage() {
    return this.addressForm.controls.area.errors.required ? 'You must enter a value' : '';
  }

  getCityErrorMessage() {
    return this.addressForm.controls.city.errors.required? 'You must enter a value' : '';
  }

  getPinCodeErrorMessage() {
    return this.addressForm.controls.pinCode.errors.required ? 'You must enter a value' :
    this.addressForm.controls.pinCode.errors.minlength ? 'Enter a Valid Pincode': 
    this.addressForm.controls.pinCode.errors.maxlength ? 'Enter a Valid Pincode':
    this.addressForm.controls.pinCode.errors.pattern ? 'Pincode must be a number' : '';
  }

  getEmailErrorMessage() {
    return this.addressForm.controls.email.errors.required ? 'You must enter a value' :
    this.addressForm.controls.email.errors.email ? 'Not a valid email' : '';
  }

  getPhoneErrorMessage() {
    return this.addressForm.controls.phone.errors.required ? 'You must enter a value' :
    this.addressForm.controls.phone.errors.minlength ? 'Enter a Valid Phone number': 
    this.addressForm.controls.phone.errors.maxlength ? 'Enter a Valid Phone number':
    this.addressForm.controls.phone.errors.pattern ? 'Phone must be a number' : '';
  }

  goToShipping() {
    this.router.navigate(['/shipment']);
  }
  
  validateForm() {
    if(this.authService.isLoggedIn() && this.addressForm.status === 'VALID' && this.productsInCartCount > 0) {
      let finalOrderObject = {};
      finalOrderObject['CustomerInfo'] = this.addressForm.value;
      finalOrderObject['OrderInfo'] = this.productsInCart;
      this.mode = 'indeterminate';
      this.data
      .saveToFirebase(finalOrderObject)
      .then(() => {
        this.mode = 'determinate';    
        this.openDialogSuccess();
        sessionStorage.removeItem('productsInCart');
      })
      .catch(error => this.openDialogFailure());
    } else if(!this.authService.isLoggedIn()) {
      let snackBarRef = this.snackBar.open('Please Login to Add Products', 'Login',{
        duration: 2000,
      });
      snackBarRef.onAction().subscribe(() => {
        let smallBox = document.querySelector('#btn_login'); 
        smallBox.dispatchEvent(new Event('click'));
      }); 
    } else if(this.addressForm.status === 'INVALID' || this.addressForm.status === undefined) {
      let snackBarRef = this.snackBar.open('Please Enter all the details', 'dismiss', {
        duration: 2000,
      });
    } else if(this.productsInCartCount === 0) {
      let snackBarRef = this.snackBar.open('No Products added in your Cart', 'dismiss', {
        duration: 2000,
      });
    }
  }
}


