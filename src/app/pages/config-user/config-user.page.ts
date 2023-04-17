import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'firebase/auth';
import { EditUserFormComponent } from 'src/app/core/components/edit-user-form/edit-user-form.component';
import { ConfigUserDataForm } from 'src/app/core/models/jsonModels/configUserForm.model';
import { UserSVC } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-config-user',
  templateUrl: './config-user.page.html',
  styleUrls: ['./config-user.page.scss'],
})
export class ConfigUserPage implements OnInit {

  userdata: any;

  public jsonConfigUserForm : ConfigUserDataForm  
  public jsonConfigUser : any = {};
  constructor(
    protected user:UserSVC,
    private modal:ModalController,
    private http:HttpClient,
    ) 
    {
      this.http.get('assets/json/form-edit-user.json').subscribe((jsonConfigUserForm:ConfigUserDataForm) => {
        this.jsonConfigUserForm = jsonConfigUserForm; 
        
      });

      this.http.get('assets/json/config-user.json').subscribe((jsonConfigUser:ConfigUserDataForm) => {
        this.jsonConfigUser = jsonConfigUser;  

      });

      
    } 

    onUpdateUser(user:User){
      this.userForm(user);
    }

    async userForm(user:User|null|undefined){
      const modal = await this.modal.create({
        component:EditUserFormComponent,
        
        componentProps:{
          user:user,
          jsonConfigUserForm:this.jsonConfigUserForm
        },
        cssClass:"modal-full-right-side"
      });
      modal.present();
      modal.onDidDismiss().then(result => {
        if(result && result.data){
          switch(result.data.mode){
            case 'Edit':
              console.log("jsonConfigUserForm " + this.jsonConfigUserForm); 
              this.user.updateUser(result.data.user)
          }
        }
      });

    }
    ngOnInit() {}
    
}

