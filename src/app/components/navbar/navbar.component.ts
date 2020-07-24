import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
//import 'rxjs/add/operator/takeWhile';
import {takeWhile} from "rxjs/operators";
import * as _ from "lodash";
//

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit, OnDestroy, OnChanges {
  //
  public isAuth: boolean = false;
  public alive: boolean = true;
  public user: any;
  public email: any; 
  //   
  constructor(public auth: AuthService,
    private router: Router) {
    this.auth.isAuthenticated()
      .pipe(takeWhile(() => this.alive))
      .takeUntil(this.auth.isSigningOut())
      .subscribe((isAuth: any) => {
        this.isAuth = isAuth;
        console.log('this.isAuth: ', this.isAuth);
      });
  }
  
  ngOnChanges(): void {
    this.user = this.auth.user();
  }

  ngOnInit() {
    this.user = this.auth.user();
    this.email = _.get(this.user,"value.email", "")
    console.log('this.user: ', this.user.value.email)
   }


  ngOnDestroy() {
    this.alive = false;
  }
  
  entrar() {
    console.log('entrar')
    this.router.navigate(['login']);
  }

  salir() {
    this.auth.logout();
    this.router.navigate(['']);
  }

  admin(){
    this.router.navigate(['admin']);
  }

  register(){
    this.router.navigate(['register']);
  }

  map(){
    this.router.navigate(['map']);
  }


}
