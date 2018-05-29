import {Component, Inject} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'footer-home',
  template: `<p><b>Kanya Collections © 2018</b>, A start up online fashion store.</p>
  <p>We sell all women wears such as night wear, Leggings lot more at factory outlet price with best quality.</p> 
  <p>We have direct partnership wiht lot of manufacturer to offer to you best price all round the year.</p>`,
  styleUrls: ['./app-footer.css']
})
export class FooterHomeSuccess {

  constructor(
    public dialogRef: MatDialogRef<FooterHomeSuccess>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'footer-policy',
  template: `<p>All Payments done through <b>paytm</b> only.</p>
  <p>Please paytm paytm to our number <b>+91-9003178800</b> only.</p>
  <p>Shipments typically takes <b>4-5 days</b> from the date of order.</p>`,
  styleUrls: ['./app-footer.css']
})
export class FooterPolicySuccess {

  constructor(
    public dialogRef: MatDialogRef<FooterPolicySuccess>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'footer-policy',
  template: `<i class="material-icons">contact_phone</i><p>Please whatsapp us on <b>9003178800</b> for any queries.</p>`,
  styleUrls: ['./app-footer.css']
})
export class FooterContactSuccess {

  constructor(
    public dialogRef: MatDialogRef<FooterContactSuccess>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}


@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.html',
  styleUrls: ['./app-footer.css']
})
export class AppFooterComponent {
  constructor(public dialog: MatDialog) {

  }

  openDialogHome() {
    this.dialog.open(FooterHomeSuccess);
  }

  openDialogPolicy() {
    this.dialog.open(FooterPolicySuccess);
  }

  openDialogContact() {
    this.dialog.open(FooterContactSuccess);
  }
}
