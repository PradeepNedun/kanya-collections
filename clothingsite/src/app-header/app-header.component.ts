import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { AuthService} from '../app/app.auth.service';
import { Products } from '../app/app.config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.html',
  styleUrls: ['./app-header.css']
})
export class AppHeaderComponent {
  userName: any;
  currentUser:any;
  logInOrLogOut:string;

  signInSignOutWithGoogle() {
    let smallBox = document.querySelector('#btn_login span.mat-button-wrapper').innerHTML.trim(); 
    if(smallBox === 'Log Out') {
      this.authService.logout();
      this.logInOrLogOut ='Log In';
      this.userName = null;
      sessionStorage.removeItem('productsInCart');
    } else {
      this.authService.signInWithGoogle().then((data) => {
        this.userName = data.additionalUserInfo.profile.given_name;
        this.logInOrLogOut ='Log Out';
      })
    }
  }

  states: any[] = Products;

  constructor(private authService:AuthService, private router: Router) {
    if (this.authService.isLoggedIn()) {
      this.logInOrLogOut ='Log Out';
    } else {
      this.logInOrLogOut ='Log In';
    }
    this.authService.getUserDetails().then((data) => {
      if(data) {
        this.userName = data['displayName'];
        this.logInOrLogOut ='Log Out';
      }
    });
  }

  goToOrders() {
    this.router.navigate(['/orders']);
  }

}
