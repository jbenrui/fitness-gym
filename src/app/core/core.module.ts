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
import { RouterModule } from '@angular/router';
import { HomePage } from '../pages/home/home.page';
import { ClientTableComponent } from './components/client-table/client-table.component';
import { ClientHeaderTableComponent } from './components/client-header-table/client-header-table.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { ClientDetailComponent } from './components/client-detail/client-detail.component';
import { GroupComponent } from './components/group/group.component';
import { GroupFormComponent } from './components/group-form/group-form.component';

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
    EditUserFormComponent,
    ClientTableComponent,
    ClientHeaderTableComponent,
    ClientFormComponent,
    ClientDetailComponent,
    GroupComponent,
    GroupFormComponent
  ],
  declarations:[
    DateSelectableComponent,
    ConfigUserComponent,
    EditUserFormComponent,
    ClientTableComponent,
    ClientHeaderTableComponent,
    ClientFormComponent,
    ClientDetailComponent,
    GroupComponent,
    GroupFormComponent
  ]

})

export class CoreModule {}