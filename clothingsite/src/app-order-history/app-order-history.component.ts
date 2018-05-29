import {Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Router } from '@angular/router';
import { DataService } from "../app/data.service";
import { AuthService } from "../app/app.auth.service";

@Component({
  selector: 'app-order-history',
  templateUrl: './app-order-history.html',
  styleUrls: ['./app-order-history.css']
})

export class AppOrderHistoryComponent implements OnInit{
  order: Array<any> = [];
  flag: boolean;
  ngOnInit(): void {

  }
  constructor(private router: Router, private data: DataService, private authService: AuthService) {
    window.scrollTo(0, 0);
    this.flag =  true;
    this.authService.getUserDetails().then((data) => {
      if(data) {
        let loggedUser = data['displayName'].replace(/\s+/g, '');
        this.data.getOrdersFromFirebase().subscribe(
          res => {
            for(var user in res) {
              if(user.indexOf(loggedUser) > -1) {
                this.order.push(res[user]);
                this.flag =  false;
              }
            }           
           },
          err => console.error(err)
        );
      } else {
        this.flag =  false;
      }
    });
  }
  goBackHome() {
    this.router.navigate(['/home']);
  }
}


