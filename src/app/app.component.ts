import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import {MatSidenav} from "@angular/material/sidenav";
import {AuthService} from "./shared/services/auth.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  page = '';
  routes: Array<string> = [];
  loggedInUser?: firebase.default.User | null;

  /* router: Router;
  constructor(router: Router) {
    this.router = router;
   } */
  // ua. mint ami ez alatt van
  title: any;

  constructor(private router: Router, private authService: AuthService) {
    // parameter adattagok
  }

  ngOnInit() {
    // fat-arrow
    this.routes = this.router.config.map(conf => conf.path) as string[];

    // rxjs - reaktív programozás
    // subscribe
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((evts: any) => {
      const currentPage = (evts.urlAfterRedirects as string).split('/')[1] as string;
      if (this.routes.includes(currentPage)) {
        this.page = currentPage;
      }
    });
    this.authService.isUserLoggedIn().subscribe(user=>{
      console.log(user);
      this.loggedInUser=user;
      localStorage.setItem('user', JSON.stringify(this.loggedInUser));
    }, error=>{
      console.error(error);
      localStorage.setItem('user', JSON.stringify('null'));
    })
  }

  changePage(selectedPage: string) {
    // this.page = selectedPage;
    this.router.navigateByUrl(selectedPage);
  }
  onToggleSidenav(sidenav: MatSidenav){
    sidenav.toggle();
  }

  onClose(event: any, sidenav: MatSidenav) {
    if(event===true){
      sidenav.close();
    }
  }
  logout(_?: boolean){
    this.authService.logout().then(async () => {
      window.location.reload();
      await this.router.navigateByUrl('/login');
      console.log('Logged out is seccessfully.');
    }).catch(error=>{
      console.error(error);
    });
  }
}
