import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ClientFormComponent } from 'src/app/core/components/client-form/client-form.component';
import { clientGym } from 'src/app/core/models/client_model_gym';
import { ClientSvcService } from 'src/app/core/services/client-svc.service';
import { lastValueFrom } from 'rxjs';
import { UserSVC } from 'src/app/core/services/user.service';
import { HttpClient } from '@angular/common/http';
import { ConfigClient } from 'src/app/core/models/jsonModels/configClient.model';
import { ConfigClientForm } from 'src/app/core/models/jsonModels/configClientForm.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public jsonTableBody:ConfigClient;
  public jsonFormClient:ConfigClientForm;

  constructor(
    protected clientSVC:ClientSvcService,
    private modal:ModalController,
    private http:HttpClient,
    private alert:AlertController,
    private translate:TranslateService
  ) {

    this.http.get('assets/json/client-table.json').subscribe((jsonTableBody:ConfigClient) => {
      this.jsonTableBody = jsonTableBody; 
      
    });

    this.http.get('assets/json/form-client.json').subscribe((jsonFormClient:ConfigClientForm) => {
      this.jsonFormClient = jsonFormClient;  

    })
    
   }

   async clientForm (client:clientGym|null|undefined){
    const modal = await this.modal.create({
        component:ClientFormComponent,
        componentProps:{
          client:client,
          jsonFormClient:this.jsonFormClient
        },
        
        cssClass:"modal-full-right-side"
    });
    
    modal.present();
    modal.onDidDismiss().then(result=>{
      if(result && result.data){
        switch(result.data.mode){
          case 'New':
            this.clientSVC.addClient(result.data.client);
            break;
          case 'Edit':
            console.log((result.data as clientGym).docId)
            this.clientSVC.updateClient(result.data.client);
            break;
          default:
        }
      }
    });
}

onAddClient(){
  this.clientForm(null);
}
onUpdateEquipment(client:clientGym){
  console.log("page:" + client.docId)
  this.clientForm(client);
} 

getClientList() {
    return this.clientSVC.client;
}


/*
async onDeleteAlert(client:any){
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
            this.clientSVC.deleteClient(client);
          
        },
      },
    ],
  });

  await alert.present();

  const { role } = await alert.onDidDismiss();
}
*/

/*
async onClientExistsAlert(equipment:any){
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
*/

/*
async onDeleteEquipment(equipament:any){
  try{
    const workout = await this.workoutSVC.getWorkoutByEquipment(equipament.docId);
    if(!workout){
      this.onDeleteAlert(equipament);
    }else{
      this.onEquipmentExistsAlert(equipament);
    }
  }catch (error) {
    console.error(error);
  }


}
*/

  ngOnInit() {
  }

}
