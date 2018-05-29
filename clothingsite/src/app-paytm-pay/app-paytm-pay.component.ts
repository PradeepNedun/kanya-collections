import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-paytm-pay',
  templateUrl: './app-paytm-pay.html',
  styleUrls: ['./app-paytm-pay.css']
})
export class AppPaytmPayComponent {
  kcAmount: String;
  constructor(private router: Router) {
    this.kcAmount = "Don't Know how much ? Please call us 9003178800";
    if(sessionStorage.getItem('kcAmount')) {
      this.kcAmount = sessionStorage.getItem('kcAmount');
    }
  }
  goBackHome() {
    this.router.navigate(['/home']);
  }
}
