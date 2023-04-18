import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { TranslateService } from '@ngx-translate/core';
=======
>>>>>>> 013b82b0a1f57d89709e310a207ac7edf3e3733b
import { UserSVC } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

<<<<<<< HEAD
  selectedLanguage:string;
  language:string;
  constructor(
    private userSVC:UserSVC,
    private translate:TranslateService
  ) {
    this.selectedLanguage = this.translate.currentLang;
    this.language = this.selectedLanguage;
   }
=======
  constructor(
    private userSVC:UserSVC
  ) { }
>>>>>>> 013b82b0a1f57d89709e310a207ac7edf3e3733b

  ngOnInit() {
  }

<<<<<<< HEAD
  changeLanguage(){
    if (this.selectedLanguage === 'en') {
      console.log(this.translate.setDefaultLang('es'));
      this.translate.setDefaultLang('es');
    } else {
      console.log(this.translate.setDefaultLang('en'));
      this.translate.setDefaultLang('en');
    }
  }
=======
>>>>>>> 013b82b0a1f57d89709e310a207ac7edf3e3733b

}
