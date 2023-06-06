import { Component, Input, OnInit } from '@angular/core';
import { groupGym } from '../../models/group_model_gym';
import { ClientsInGroupService } from '../../services/clients-in-group.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
})
export class ClientListComponent implements OnInit {

  @Input() group:groupGym

  constructor(
    private cigSVC: ClientsInGroupService
  ) { }

  ngOnInit() {
  }

  getClientsInNotGroup(){
    //return this.cigSVC.listClientsNotInGroup(this.group);
  }

}

