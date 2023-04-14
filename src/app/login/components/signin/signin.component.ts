import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { UserSVC } from 'src/app/core/services/user.service';
import { SingupComponent } from '../singup/singup.component';
import { RecoverPasswordComponent } from '../recover-password/recover-password.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  form:FormGroup;
  constructor(
    private formbuilder:FormBuilder,
    private modalContrl:ModalController,
    private user:UserSVC,
    private router:Router) {

      this.form = this.formbuilder.group({
        identifier:["",[Validators.required, Validators.email]],
        password:["",[Validators.required]]
  
      });
     }

  ngOnInit() {}


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

  async signIn(){
    try{
      await this.user.login(this.form.value);
      console.log("Login successful, navigating to home...");
      this.router.navigate(['home'],{replaceUrl:true})
      
    }catch (error){
      console.log(error)
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
