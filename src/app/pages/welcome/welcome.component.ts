import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GroupService} from "../../shared/services/group.service";
import {AuthService} from "../../shared/services/auth.service";
import {UserService} from "../../shared/services/user.service";
import {Group} from "../../shared/models/Group";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit{
  user?: any;
  groups: Group[] = [];
  constructor(private actRoute: ActivatedRoute,
              private groupService: GroupService,
              private auth:AuthService,
              private userService: UserService) {
  }
  async ngOnInit() {
    const user= JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.userService.getById(user.uid).subscribe((value) => {
      this.user = value;
    });
  }
}
