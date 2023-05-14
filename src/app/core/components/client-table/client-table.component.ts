import { Component, Input, OnInit } from '@angular/core';
import { clientGym } from '../../models/client_model_gym';

@Component({
  selector: 'app-client-table',
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.scss'],
})
export class ClientTableComponent implements OnInit {

  @Input() client!:clientGym;
  constructor() { 
    
  }

  ngOnInit() {
    console.log(this.client)
  }

}
