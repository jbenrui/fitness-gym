import { Component, OnInit } from '@angular/core';
import { UserSVC } from '../core/services/user.service';
import { FirebaseService } from '../core/services/firebase/firebase-service';

import { AuthService } from '../core/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  sessionData: any;
  constructor(
    private authService: AuthService,
    
  ) { 
    
  }
  async ngOnInit(){
  }
  
  async checkSession() {
    //this.sessionData = await this.authService.getSessionData();
    console.log(this.sessionData); // Imprime los datos de sesión en la consola
  }

}
