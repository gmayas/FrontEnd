import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/debounceTime';
import 'rxjs-compat/add/operator/takeUntil';
import * as _ from "lodash";
import { ToastrService } from 'ngx-toastr';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService,
    private auth: AuthService) {
  }

  getBookings(emailUser) {
    try {
     let headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'token': localStorage.getItem('jwtToken'),
          adminemail: emailUser,
          app: "APP_BCK",
        });
      let params: any = 'current=true';
      //
      return this.http.get(`https://dev.tuten.cl/TutenREST/rest/user/${encodeURIComponent('contacto@tuten.cl')}/bookings?${ params }`, { headers }  )
        .pipe(map((data: any) => {
          console.log('data: ', data)
          return data;
        }, error => {
          this.auth.logout();
          this.router.navigate(['home']);
          this.toastr.success('Hello: Your session has expired, just log in again.', 'Aviso de Angular 9', {
            timeOut: 10000,
            positionClass: 'toast-bottom-right'
          });
          console.log('error getBookings: ', error)
        }));
    } catch (e) {
      console.log('error getBookings: ', e)
    }
  }
   
}
