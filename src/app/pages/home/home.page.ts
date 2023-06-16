import { Component, OnInit } from '@angular/core';
import { UserSVC } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user_model_gym';
import { ScreenSizeSVCService } from 'src/app/core/services/screen-size-svc.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  user:any;

  ScreenSizeWidth:number = this.ScreenSizeSVC.getScreenSizeWidth();

  //Size Plataforms
  PhoneWidth:number = 500;
  TabletWidth:number = 600;
  MonitorWidth:number = 1000;
  constructor(
    protected userSVC:UserSVC,
    private ScreenSizeSVC:ScreenSizeSVCService

  ) {

  }
  ngOnInit(){
    const uid = this.userSVC.getUser().uid;
    this.user = this.userSVC.getUserByUid(uid)
  }

  getScreenSize(){
    this.ScreenSizeWidth = this.ScreenSizeSVC.getScreenSizeWidth()
  }

  screenType():'BIG'|'SMALL'{
    if (this.ScreenSizeWidth <= this.PhoneWidth){
      return 'SMALL'
    }else if (this.ScreenSizeWidth > this.TabletWidth && this.ScreenSizeWidth < this.MonitorWidth ){
      return 'BIG'
    }else{
      return 'BIG';
    }
  }

  signOut(){
    this.userSVC.signOut();
  }

}
