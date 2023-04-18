<<<<<<< HEAD
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  constructor(
    private translate : TranslateService
  ) {
    this.translate.setDefaultLang('en');
  }

  clickOnLanguage(language:string){
    this.translate.setDefaultLang(language)
  }
}
=======
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  constructor(
    private translate : TranslateService
  ) {
    this.translate.setDefaultLang('en');
  }

  clickOnLanguage(language:string){
    this.translate.setDefaultLang(language)
  }
}
>>>>>>> 013b82b0a1f57d89709e310a207ac7edf3e3733b
