import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";
import {UserService} from "../../shared/services/user.service";
import {GroupService} from "../../shared/services/group.service";
import {Group} from "../../shared/models/Group";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  user?: any;
  loading?: boolean;
  type?: Group;
  isAdd?: boolean;
  name: string = '';
  groups: Group[] = [];

  constructor(private actRoute: ActivatedRoute,
              private groupService: GroupService,
              private auth:AuthService,
              private userService: UserService) { }

  async ngOnInit() {
    const user= JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.userService.getById(user.uid).subscribe(value => {
      this.user = value;
      this.groupService.getAll(this.user.id).subscribe(groups => {
        this.groups = groups;
        console.log(groups)
      });
    });
  }

  addGroup() {
    this.isAdd = false;
    console.log('add works')
    if (this.name !== '') {
      let group: Group = {
        id: '',
        name: this.name,
        userId: this.user.id
      };
      this.groupService.create(group);
    }
  }
}
