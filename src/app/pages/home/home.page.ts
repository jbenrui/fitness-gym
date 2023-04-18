import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserSVC } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  selectedLanguage:string;
  language:string;
  constructor(
    private userSVC:UserSVC,
    private translate:TranslateService
  ) {
    this.selectedLanguage = this.translate.currentLang;
    this.language = this.selectedLanguage;
   }


  ngOnInit() {
  }


  changeLanguage(){
    if (this.selectedLanguage === 'en') {
      console.log(this.translate.setDefaultLang('es'));
      this.translate.setDefaultLang('es');
    } else {
      console.log(this.translate.setDefaultLang('en'));
      this.translate.setDefaultLang('en');
    }
  }

}
