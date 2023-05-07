import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { FakeLoadingService } from '../../shared/services/fake-loading.service';
import {AuthService} from "../../shared/services/auth.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  email = new FormControl('');
  password = new FormControl('');

  loadingSubscription?: Subscription;
  loadingObservation?: Observable<boolean>;

  loading: boolean=false;

  constructor(private router: Router, private loadingService: FakeLoadingService, private authServices: AuthService ) { }

  ngOnInit(): void {
  }
  async login() {
    this.loading=true;
    await this.authServices.login(this.email.value as string, this.password.value as string).then(cred => {
      console.log(cred);
      this.router.navigateByUrl('/welcome');
      this.loading = false;
    }).catch(error=>{
      console.log(error);
    })
  }
    ngOnDestroy(){
      this.loadingSubscription?.unsubscribe();
    }
    //(1)-subscription.unsubscribe(); //ennek most nincs ertelme, 3 mp perc mulva futna az elozo, ezert belul kell a leiratkozast letrehozni

}
