import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { PasswordValidation } from 'src/app/core/utils/password-validator';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss'],
})
export class SingupComponent implements OnInit {

  form:FormGroup
  constructor(
    private formBuilder:FormBuilder,
    private modalController:ModalController,
    
  ) {
    this.form = this.formBuilder.group({
      first_name:["",Validators.required],
      last_name:["",Validators.required],
      birthdate:["",Validators.required],
      email:["",[Validators.required, Validators.email]],
      password:["",Validators.required],
      confirm_password:["",Validators.required],
      phone:["",Validators.required],
      dni:["",Validators.required]
    },{validator:[PasswordValidation.passwordMatch, PasswordValidation.passwordProto]});
   }

  ngOnInit() {}

  onSubmit(){
    this.modalController.dismiss({
      first_name:this.form.value.first_name,
      last_name:this.form.value.last_name,
      birthdate:this.form.value.birthdate,
      username:this.form.value.username,
      email:this.form.value.email,
      password:this.form.value.password,
      phone:this.form.value.phone,
      dni:this.form.value.dni
      
    }, 'ok');
  }

  onDismiss(){
    this.modalController.dismiss(null,'cancel');
  }

}
