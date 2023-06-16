import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { CoreModule } from '../core/core.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from '../core/utils/translate';
import { HttpClient } from '@angular/common/http';
import { SigninComponent } from './components/signin/signin.component';
import { SingupComponent } from './components/singup/singup.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { IonicStorageModule } from '@ionic/storage-angular';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoreModule,
    IonicStorageModule.forRoot(), // Importar el proveedor IonicStorageModule aquí
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    LoginPageRoutingModule
  ],
  declarations: [LoginPage, SigninComponent, SingupComponent, RecoverPasswordComponent],
  providers: [
    Storage,
  ]
})
export class LoginPageModule {}

