import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { ModalController } from '@ionic/angular';
import { User } from 'firebase/auth';
import { EditUserFormComponent } from 'src/app/core/components/edit-user-form/edit-user-form.component';
=======
>>>>>>> 013b82b0a1f57d89709e310a207ac7edf3e3733b
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
<<<<<<< HEAD
    private modal:ModalController,
=======
>>>>>>> 013b82b0a1f57d89709e310a207ac7edf3e3733b
    private http:HttpClient,
    ) 
    {
      this.http.get('assets/json/form-edit-user.json').subscribe((jsonConfigUserForm:ConfigUserDataForm) => {
<<<<<<< HEAD
        this.jsonConfigUserForm = jsonConfigUserForm; 
        
=======
        this.jsonConfigUserForm = jsonConfigUserForm;  
>>>>>>> 013b82b0a1f57d89709e310a207ac7edf3e3733b
      });

      this.http.get('assets/json/config-user.json').subscribe((jsonConfigUser:ConfigUserDataForm) => {
        this.jsonConfigUser = jsonConfigUser;  

      });

      
    } 

<<<<<<< HEAD

   /**
     * Sign out the user
     *
     * Calls the `signOut()` method from the `userSVC` service to sign out the user.
     */
    signOut(user:User) {
      this.user.signOut();
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
              this.user.updateUser(result.data.user)
          }
        }
      });

    }
=======
>>>>>>> 013b82b0a1f57d89709e310a207ac7edf3e3733b
    ngOnInit() {}
    
}

