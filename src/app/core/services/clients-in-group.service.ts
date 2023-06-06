import { Injectable } from '@angular/core';
import { UserSVC } from './user.service';
import { groupGym } from '../models/group_model_gym';
import { GroupSvcService } from './group-svc.service';
import { ClientSvcService } from './client-svc.service';
import { BehaviorSubject } from 'rxjs';
import { clientGym } from '../models/client_model_gym';
import { FirebaseService } from './firebase/firebase-service';

@Injectable({
  providedIn: 'root'
})
export class ClientsInGroupService {


  private _clientInGroup:BehaviorSubject<clientGym[]> = new BehaviorSubject([]);
  public clientInGroup = this._clientInGroup.asObservable();


  unsubcr;
  constructor(
    private clientSVC: ClientSvcService,
    private groupSVC: GroupSvcService,
    private firebase:FirebaseService
  ) { 
    //this.unsubcr = this.firebase.subscribeToCollection('clientes',this._clientInGroup,this.mapClient)

  }

}

