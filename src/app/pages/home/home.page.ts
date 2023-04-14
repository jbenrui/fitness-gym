import { Component, OnInit } from '@angular/core';
import { UserSVC } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private userSVC:UserSVC
  ) { }

  ngOnInit() {
  }


}
