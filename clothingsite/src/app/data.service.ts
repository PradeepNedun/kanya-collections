import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { FirebaseObjectObservable } from "angularfire2/database-deprecated";

@Injectable()

export class DataService {
  itemsRef: AngularFireObject<any>;
  item: Observable<any>;

  constructor(private db: AngularFireDatabase) { 
    this.item = db.object('Orders').valueChanges();
  }

  getOrdersFromFirebase() {
    return this.item;
  }

  getItemsFromFirebase() {
    this.itemsRef = this.db.object('Orders/');
    return this.itemsRef;
  }

  saveToFirebase(newOrder: Object) {
    let timeStamp = Date.now().toString();
    newOrder['orderDateTime'] = new Date(parseInt(timeStamp)).toString();
    newOrder['OrderDeliveryDate'] = "Planning";
    newOrder['orderStatus'] = "Processing";
    newOrder['orderID'] = newOrder['CustomerInfo']['name'].replace(/\s+/g, '')+"-"+ timeStamp;
    return this.db.object('Orders/'+newOrder['CustomerInfo']['name'].replace(/\s+/g, '')+"-"+ timeStamp).set(newOrder);
  }
}