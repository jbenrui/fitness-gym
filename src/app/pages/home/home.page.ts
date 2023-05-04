import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ClientFormComponent } from 'src/app/core/components/client-form/client-form.component';
import { clientGym } from 'src/app/core/models/client_model_gym';
import { ClientSvcService } from 'src/app/core/services/client-svc.service';
import { lastValueFrom } from 'rxjs';
import { UserSVC } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {



  constructor(
    protected clientSVC:ClientSvcService,
    private modal:ModalController,
    private alert:AlertController,
    private translate:TranslateService
  ) {
    
   }

   async clientForm (client:clientGym|null|undefined){
    const modal = await this.modal.create({
        component:ClientFormComponent,
        componentProps:{
          client:client
        },
        cssClass:"modal-full-right-side"
    });
    modal.present();
    modal.onDidDismiss().then(result=>{
      if(result && result.data){
        switch(result.data.mode){
          case 'New':
            this.clientSVC.addClient(result.data.equipament);
            break;
          case 'Edit':
            console.log((result.data as clientGym).docId)
            this.clientSVC.updateClient(result.data.equipament);
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
