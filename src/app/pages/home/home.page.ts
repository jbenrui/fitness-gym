import { Component, OnInit } from '@angular/core';
import { UserSVC } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user_model_gym';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  user:any;
  constructor(
    protected userSVC:UserSVC,

  ) {

  }
  ngOnInit(){
    const uid = this.userSVC.getUser().uid;
    this.user = this.userSVC.getUserByUid(uid)
  }

}
