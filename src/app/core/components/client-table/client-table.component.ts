import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { clientGym } from '../../models/client_model_gym';

@Component({
  selector: 'app-client-table',
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.scss'],
})
export class ClientTableComponent implements OnInit {
  @Output() onUpdate = new EventEmitter;
  @Output() onDelete = new EventEmitter;
  @Input() client!:clientGym;
  constructor() { 
    
  }

  ngOnInit() {
    console.log(this.client)
  }

  onUpdateClick(){
    this.onUpdate.emit(this.client);
  }

  onDeleteClick(){
    this.onDelete.emit(this.client);
  }
}
