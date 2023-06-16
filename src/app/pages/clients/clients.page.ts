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
import { ClientDetailComponent } from 'src/app/core/components/client-detail/client-detail.component';
import { ScreenSizeSVCService } from 'src/app/core/services/screen-size-svc.service';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})
export class ClientsPage implements OnInit {

  public jsonTableBody:ConfigClient;
  public jsonFormClient:ConfigClientForm;

  constructor(
    protected clientSVC:ClientSvcService,
    private modal:ModalController,
    private http:HttpClient,
    private alert:AlertController,
    private translate:TranslateService,
    private screenSizeSVC: ScreenSizeSVCService
  ) {

    this.http.get('assets/json/client-table.json').subscribe((jsonTableBody:ConfigClient) => {
      this.jsonTableBody = jsonTableBody; 
      
    });

    this.http.get('assets/json/form-client.json').subscribe((jsonFormClient:ConfigClientForm) => {
      this.jsonFormClient = jsonFormClient;  

    })
    
   }

   //Size Plataforms
  PhoneWidth:number = 540;
  TabletWidth:number = 600;
  MonitorWidth:number = 1000;

  ScreenSizeWidth:number = this.screenSizeSVC.getScreenSizeWidth()

  getScreenSize(){
    this.ScreenSizeWidth = this.screenSizeSVC.getScreenSizeWidth()
  }

  screenType():'BIG'|'SMALL'{
    if (this.ScreenSizeWidth <= this.PhoneWidth){
      return 'SMALL'
    }else if (this.ScreenSizeWidth > this.TabletWidth && this.ScreenSizeWidth < this.MonitorWidth ){
      return 'BIG'
    }else{
      return 'BIG';
    }
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
            this.clientSVC.updateClient(result.data.client);
            break;
          default:
        }
      }
    });
}

async clientDetail (client:clientGym|null|undefined){
  const modal = await this.modal.create({
      component:ClientDetailComponent,
      componentProps:{
        client:client,
        jsonFormClient:this.jsonFormClient
      },
      
      cssClass:"modal-full-right-side"
  });
  
  modal.present();
  modal.onDidDismiss();
}

onAddClient(){
  this.clientForm(null);
}
onUpdateClient(client:clientGym){
  this.clientForm(client);
} 

onDetailClient(client:clientGym){
  this.clientDetail(client);
}

getClientList() {
    return this.clientSVC.client;
}

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

async onClientExistsAlert(client:any){
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

async onDeleteClient(client:any){
  try{
    const clientOnGroup = null
    //await this.clientSVC.getWorkoutByEquipment(equipament.docId);
    if(!clientOnGroup){
      this.onDeleteAlert(client);
    }else{
      this.onClientExistsAlert(client);
    }
  }catch (error) {
    console.error(error);
  }


}

  ngOnInit() {
  }

}