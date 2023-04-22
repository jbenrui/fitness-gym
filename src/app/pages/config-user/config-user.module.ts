import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfigUserPageRoutingModule } from './config-user-routing.module';

import { ConfigUserPage } from './config-user.page';
import { CoreModule } from 'src/app/core/core.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/core/utils/translate';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ConfigUserComponent } from 'src/app/core/components/config-user/config-user.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    
    ConfigUserPageRoutingModule,
    CoreModule,
    RouterModule.forChild([{ path: '', component: ConfigUserComponent }]),
    TranslateModule.forChild({
      loader:{ 
        provide:TranslateLoader,
        useFactory:(createTranslateLoader),
        deps:[HttpClient]  
      }
    }),
  ],
  declarations: [ConfigUserPage]
})
export class ConfigUserPageModule {}
