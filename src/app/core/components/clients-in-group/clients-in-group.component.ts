import { Component, Input, OnInit } from '@angular/core';
import { groupGym } from '../../models/group_model_gym';
import { ModalController } from '@ionic/angular';
import { ClientListComponent } from '../client-list/client-list.component';

@Component({
  selector: 'app-clients-in-group',
  templateUrl: './clients-in-group.component.html',
  styleUrls: ['./clients-in-group.component.scss'],
})
export class ClientsInGroupComponent implements OnInit {

  @Input() group: groupGym;

  constructor( private modal:ModalController,
    private modal2:ModalController) {
   
   }

  ngOnInit() {
  }

  getClientListInGroup() {
    return this.group.clients;
  }
  
  async clientList (group:groupGym|null|undefined){
    const modal = await this.modal2.create({
        component:ClientListComponent,
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
            //this.groupSVC.addGroup(result.data.client);
            break;
          case 'Edit':
            //this.groupSVC.updateGroup(result.data.client);
            break;
          default:
        }
      }
    });
  }

  onAddGroup(){
    this.clientList(this.group)
  }
}
