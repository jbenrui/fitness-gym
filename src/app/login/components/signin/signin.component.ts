import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { UserSVC } from 'src/app/core/services/user.service';
import { SingupComponent } from '../singup/singup.component';
import { RecoverPasswordComponent } from '../recover-password/recover-password.component';
import { Storage } from '@ionic/storage-angular';
import { Observable, first, fromEvent } from 'rxjs';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  form:FormGroup;
  sessionData:any;
  lastSessionDate:any;
  constructor(
    private formbuilder:FormBuilder,
    private modalContrl:ModalController,
    private user:UserSVC,
    private router:Router,
    private storage: Storage) {

      this.form = this.formbuilder.group({
        identifier:["",[Validators.required, Validators.email]],
        password:["",[Validators.required]]
  
      });
     }

     async ngOnInit() {
      this.storage = await this.storage.create();
      const lastSession = await this.storage?.get('lastSession');
      this.sessionData = lastSession;
      this.lastSessionDate = await this.storage?.get('lastSessionDate');
    }
    

  async recoverPassword(){
    const modal = await this.modalContrl.create({
      component:RecoverPasswordComponent,
      cssClass:"modal-full-right-side",
      
    });
    modal.onDidDismiss().then(async (response) => {
      try{
        if(response.role = 'ok'){
          console.log(response.data.email)
          await this.user.recoverPassword(response.data.email);
        }
      }catch(error){
        console.log(error);
      }
    });
    modal.present();
  }


  async signUp(){
    const modal = await this.modalContrl.create({
      component:SingupComponent,
      cssClass:"modal-full-right-side",

    });

      modal.onDidDismiss().then(async (response) => 
      {
        try{
          if(response.role == 'ok'){
            await this.user.register(response.data);
            this.router.navigate(['home']),{remplaceUrl:true};
          }
        }catch(error){
          console.log(error);
        }
        
      });
      modal.present();
  }

  async signIn() {
    try {
      await this.user.login(this.form.value);
      console.log("Login successful, navigating to home...");
      const user = await this.user.getUser().email; // Obtener los datos del usuario
      await this.storage?.set('lastSession', user); // Guardar la última sesión en Ionic Storage
      const sessionDate = new Date();
      await this.storage?.set('lastSessionDate',sessionDate);
      this.router.navigate(['home'], { replaceUrl: true });
    } catch (error) {
      console.log(error);
    }
  }
  

  hasFormError(error){
    return this.form?.errors && Object.keys(this.form.errors).filter(e=>e==error).length==1;
  }
  
  errorsToArray(errors){
   
    if(errors && !('required' in errors))
      return [Object.keys(errors)[0]];
    else
      return [];
  } 

}
