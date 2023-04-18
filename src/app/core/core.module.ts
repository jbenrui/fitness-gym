import {LOCALE_ID, NgModule} from '@angular/core'
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from './utils/translate';
import es  from '@angular/common/locales/es';
import en  from '@angular/common/locales/en';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { DateSelectableComponent } from './components/date-selectable/date-selectable.component';
import { ConfigUserComponent } from './components/config-user/config-user.component';
import { EditUserFormComponent } from './components/edit-user-form/edit-user-form.component';

registerLocaleData(en);
registerLocaleData(es);

@NgModule({
  imports: 
  [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,

    TranslateModule.forChild({
      loader:{ 
        provide:TranslateLoader,
        useFactory:(createTranslateLoader),
        deps:[HttpClient]  
      }
    }),
  ],
  providers:[
    {
      provide: LOCALE_ID,
      useValue: 'es'
    },
    Camera,
    File
  ],
  exports:
  [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HttpClientModule,
    DateSelectableComponent,
    ConfigUserComponent,
    EditUserFormComponent
  ],
  declarations:[
    DateSelectableComponent,
    ConfigUserComponent,
    EditUserFormComponent
  ]

})

export class CoreModule {}