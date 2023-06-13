import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom } from 'rxjs';
import { EditUserFormComponent } from 'src/app/core/components/edit-user-form/edit-user-form.component';
import { ConfigUserDataForm } from 'src/app/core/models/jsonModels/configUserForm.model';
import { User } from 'src/app/core/models/user_model_gym';
import { GroupSvcService } from 'src/app/core/services/group-svc.service';
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
    private alert:AlertController,
    private translate:TranslateService,
    private groupSVC:GroupSvcService
    ) 
    {
      this.http.get('assets/json/form-edit-user.json').subscribe((jsonConfigUserForm:ConfigUserDataForm) => {
        this.jsonConfigUserForm = jsonConfigUserForm; 
        
      });

      this.http.get('assets/json/config-user.json').subscribe((jsonConfigUser:ConfigUserDataForm) => {
        this.jsonConfigUser = jsonConfigUser;  

      });

    } 

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

    deleteUser(u:User){
      this.onDeleteUser(u);
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

    async onDeleteAlert(user:User){
      const alert = await this.alert.create({
        header: await lastValueFrom(this.translate.get('general.warning')),
        buttons: [
          {
            text: await lastValueFrom(this.translate.get('general.btn_cancel')),
            role: 'cancel',
            handler: () => {
              console.log("Operacion cancelada");
            },
          },
          {
            text: await lastValueFrom(this.translate.get('general.btn_delete')),
            role: 'confirm',
            handler: () => {
                this.user.deleteUser(user);
              
            },
          },
        ],
      });
    
      await alert.present();
    
      const { role } = await alert.onDidDismiss();
    }

    async onUserExistsAlertInGroup(user:User){
      const alert = await this.alert.create({
        header: 'Error',
        message: await lastValueFrom(this.translate.get('general.exist')),
        buttons: [
          {
            text: await lastValueFrom(this.translate.get('general.btn_close')),
            role: 'close',
            handler: () => {
            },
          },
        ],
      });
    
      await alert.present();
    
      const { role } = await alert.onDidDismiss();
    }

    ngOnInit() {}
    

    async onDeleteUser(user:User){
      try{
        const OnGroup = this.groupSVC.getGroupByIdUser(user.uid);
        
        if (!OnGroup) {
          this.onDeleteAlert(user);
        }else{
          this.onUserExistsAlertInGroup(user);
        }
      }catch (error) {
        console.error(error);
      }
    }
}

