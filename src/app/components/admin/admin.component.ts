import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { takeWhile } from "rxjs/operators";
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as _ from "lodash";
import { UsersService } from 'src/app/services/users.service';

//
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy, OnChanges {
  //
  adminForm: FormGroup;
  loading = false;
  submitted = false;
  //
  public isAuth: boolean = false;
  public alive: boolean = true;
  public user: any;
  public Bookings: any
  //
  constructor(public auth: AuthService, public userServ: UsersService, private formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router, private toastr: ToastrService) {
    this.user = this.auth.user();
    console.log('this.user: ', _.get(this.user.value, 'email'))
    this.getBookings(_.get(this.user.value, 'email')); 
  }

  ngOnInit() {
    //emailuser, nameuser, passworduser, typeiduser
    /*this.adminForm = this.formBuilder.group({
      id: [null],
      plates: ['', [Validators.required]],
      make: ['', Validators.required],
      color: ['', [Validators.required]],
      model: ['', [Validators.required]],
      userid: [null],
      positiongps: [null]
    });*/

  }

  ngOnDestroy() {
    this.alive = false;
  }

  ngOnChanges() {
    
  }

  // convenience getter for easy access to form fields
  //get f() { return this.adminForm.controls; }

  onReset() {
    this.submitted = false;
    this.loading = false;
    //this.userServ.selectVehicle = new vehicleModel();
    this.adminForm.reset();
    console.log('this.adminForm.value: ', this.adminForm.value);
  }

  getBookings(emailUser) {
    this.userServ.getBookings(emailUser)
       .subscribe((data: any) => {
        this.Bookings = data;
        console.log('this.Bookings: ', this.Bookings);
      });
  }

  
}
