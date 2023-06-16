import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from './core/utils/translate';
import { FirebaseService } from './core/services/firebase/firebase-service';
import { FirebaseWebService } from './core/services/firebase/web/firebase-web.service';
import { CoreModule } from './core/core.module';
import { ConfigUserComponent } from './core/components/config-user/config-user.component';
import { IonicStorageModule } from '@ionic/storage-angular';


export function firebaseServiceFactory() {
  return  new FirebaseWebService();
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(),
    AppRoutingModule, CoreModule, HttpClientModule,
    IonicStorageModule.forRoot({
      name:"db"
    }),
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory:(createTranslateLoader),
        deps:[HttpClient]

      }
     })],
     
  providers: [
    Storage,
    {  provide: RouteReuseStrategy,
       useClass: IonicRouteStrategy 
    },
    {
      provide: FirebaseService,
      deps: [],
      useFactory: firebaseServiceFactory
    },
      ],
  bootstrap: [AppComponent],
  
  
})
export class AppModule {}