import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { GroupFormComponent } from 'src/app/core/components/group-form/group-form.component';
import { groupGym } from 'src/app/core/models/group_model_gym';
import { ConfigGroup} from 'src/app/core/models/jsonModels/configGroup.model';
import { lastValueFrom } from 'rxjs';
import { ConfigGroupForm } from 'src/app/core/models/jsonModels/configGroupForm.model';
import { GroupSvcService } from 'src/app/core/services/group-svc.service';
import { ClientsInGroupComponent } from 'src/app/core/components/clients-in-group/clients-in-group.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
})
export class GroupsPage implements OnInit {

  public jsonCardBody:ConfigGroup;
  public jsonFormGroup:ConfigGroupForm; 

  constructor(
    protected groupSVC:GroupSvcService,
    private modal:ModalController,
    private http:HttpClient,
    private alert:AlertController,
    private translate:TranslateService
  ) { }

  ngOnInit() {
    this.http.get('assets/json/group-item.json').subscribe((jsonCardBody:ConfigGroup) => {
      this.jsonCardBody = jsonCardBody; 
    });

    this.http.get('assets/json/group-form.json').subscribe((jsonFormGroup:ConfigGroupForm) => {
      this.jsonFormGroup = jsonFormGroup; 
    });

  }

  async groupForm (group:groupGym|null|undefined){
    const modal = await this.modal.create({
        component:GroupFormComponent,
        componentProps:{
          group:group,
          jsonFormGroup:this.jsonFormGroup
        },
        
        cssClass:"modal-full-right-side"
    });
    
    modal.present();
    modal.onDidDismiss().then(result=>{
      if(result && result.data){
        switch(result.data.mode){
          case 'New':
            this.groupSVC.addGroup(result.data.client);
            break;
          case 'Edit':
            this.groupSVC.updateGroup(result.data.client);
            break;
          default:
        }
      }
    });
  }


  async clientList (group:groupGym|null|undefined){
    const modal = await this.modal.create({
        component:ClientsInGroupComponent,
        componentProps:{
          group:group,
        },
        
        cssClass:"modal-full-right-side"
    });
    
    modal.present();
    modal.onDidDismiss().then(result=>{
      if(result && result.data){
        switch(result.data.mode){
          case 'New':
            this.groupSVC.addGroup(result.data.client);
            break;
          case 'Edit':
            this.groupSVC.updateGroup(result.data.client);
            break;
          default:
        }
      }
    });
  }

  getGroupList() {
    return this.groupSVC.group;
  }


  onAddGroup(){
    this.groupForm(null);
  }

  onUpdateGroup(group:groupGym){
    this.groupForm(group);
  }

  onDetailGroup(group:groupGym){
    this.clientList(group);
  } 


  async onDeleteAlert(group:any){
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
              this.groupSVC.deleteGroup(group);
            
          },
        },
      ],
    });
  
    await alert.present();
  
    const { role } = await alert.onDidDismiss();
  }
  
  async onDeleteGroup(group:any){
    try{
      const OnGroup = null

      if(!OnGroup){
        this.onDeleteAlert(group);
      }
    }catch (error) {
      console.error(error);
    }
  }

}
