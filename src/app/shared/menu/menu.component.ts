import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterViewInit{
  @Output() selectPage:EventEmitter<string>= new EventEmitter();
  @Input() loggedInUser?: firebase.default.User | null;
  @Input() currentPage:string="";
  @Output() onCloseSidenav: EventEmitter<boolean>= new EventEmitter<boolean>()
  @Output() onLogout: EventEmitter<boolean>= new EventEmitter();

  constructor() {
    console.log("lefut a const");

  }
  ngOnInit():void {
    console.log("lefut az oninit");
  }
  ngAfterViewInit():void{
    console.log("lefut az afterviewinit");
  }

  menuSwitch() {
    this.selectPage.emit(this.currentPage);
  }

  close(logout?:boolean){
    if(logout===true){
      this.onLogout.emit(logout);
    }
    this.onCloseSidenav.emit(true);
  }
}
