import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Products } from '../app/app.config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './app-filter-panel.html',
  styleUrls: ['./app-filter-panel.css']
})
export class AppFilterPanelComponent {
  filterProducts: any;
  products:any[] = Products;
  @Output() messageEvent = new EventEmitter<string>();

  constructor() {
    this.filterProducts = this.products.map(
      product => product.filterQuery);
    this.filterProducts = this.getUniqueLables(this.filterProducts);
  }

  getUniqueLables (xs) {
    var seen = {}
    return xs.filter(function(x) {
      if (seen[x])
        return
      seen[x] = true
      return x
    })
  }

  updateModel(item) {
    this.messageEvent.emit(item);
  }
}
