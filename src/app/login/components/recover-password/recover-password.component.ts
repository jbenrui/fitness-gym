import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss'],
})
export class RecoverPasswordComponent implements OnInit {

  form:FormGroup
  constructor(
    private formBuilder:FormBuilder,
    private modalController:ModalController,
    
  ) {
    this.form = this.formBuilder.group({
      email:["",[Validators.required, Validators.email]],
    });
   }

  ngOnInit() {}
  
  onSubmit(){
    this.modalController.dismiss({
      email:this.form.value.email,
    }, 'ok');
  }

  onDismiss(){
    this.modalController.dismiss(null,'cancel');
  }


}
