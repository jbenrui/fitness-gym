import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { groupGym } from '../../models/group_model_gym';
import { ModalController } from '@ionic/angular';
import { ClientListComponent } from '../client-list/client-list.component';
import { ClientSvcService } from '../../services/client-svc.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { clientGym } from '../../models/client_model_gym';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-clients-in-group',
  templateUrl: './clients-in-group.component.html',
  styleUrls: ['./clients-in-group.component.scss'],
})
export class ClientsInGroupComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();


  private _group: groupGym;
  private _clients: BehaviorSubject<Array<clientGym>> = new BehaviorSubject<Array<clientGym>>([]);
  public clients$ = this._clients.asObservable();

  @Output() onDelete = new EventEmitter;;

  @Input('group') set group(g: groupGym) {
    this._group = g;
    if (g && g.docId) {
      this.getClientsByIdGroup(g.docId).then((clients) => {
        this._clients.next(clients);
      });
    }
  }

  public get group() {
    return this._group;
  }

  constructor(
    private clientSVC: ClientSvcService,
    private modalController:ModalController)
  {}

  ngOnInit(){}

  getClientsByIdGroup(docId: string) {
    return this.clientSVC.getClientByIdGroup(docId);
  }

  onDismiss(){
    this.modalController.dismiss(null,'cancel');
  }

  onDeleteClick(client: clientGym) {
    this.clientSVC.deleteClientInGroup(client).then(() => {
      const currentClients = this._clients.getValue();
      const updatedClients = currentClients.filter((c) => c.id !== client.id);
      this._clients.next(updatedClients);
    });
  }

  
}

