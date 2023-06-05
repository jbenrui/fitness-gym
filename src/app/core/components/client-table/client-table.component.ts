import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { clientGym } from '../../models/client_model_gym';
import { TranslateService } from '@ngx-translate/core';
import { ConfigClientData } from '../../models/jsonModels/configClient.model';

export interface ConfigClient {
  config: ConfigClientData[]
}

@Component({
  selector: 'app-client-table',
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.scss'],
})
export class ClientTableComponent implements OnInit {
  /**
   * Output EventEmitter for events
   * Emits an event when the buttons are clicked
   */
  @Output() onUpdate = new EventEmitter;
  @Output() onDelete = new EventEmitter;
  @Output() onDetail = new EventEmitter;
  /**
   * Input property to receive Client data of type clientGym
   */
  @Input() client!:clientGym;

  /**
   * Array to store header data for ConfigClientData type
   */
  headerArray: ConfigClientData[] = [];

  /**
   * Array to store body data for ConfigClientData type
   */
  bodyArray: ConfigClientData[] = [];

  /**
   * Array to store type data for ConfigUserData type
   */
  typeArray: ConfigClientData[] = [];

  /**
   * Input property to receive jsonConfigClient data of type ConfigClient
   */
  @Input() jsonTableBody!: ConfigClient;
 


  constructor(
    private translate : TranslateService,
  ) { }
  
  ngOnInit() {}

   /**
   * Get Header of Json Schema 
   * 
   * @param array - the input array
   * 
   * @returns Another Array with strings Json Schema  attributes 
   */

   getHeader(array: ConfigClientData[]): string[] {
    array = this.jsonTableBody?.config;
    
   
    const labels: string[] = [];
    if (array) {
      if(this.translate.defaultLang === "en"){
        array.forEach(config => {
          labels.push(config.LabelEN);
        });
      }else{
        array.forEach(config => {
          labels.push(config.LabelES);
        });
      }
      
    }
    return labels;
  }

     /**
   * Get Body of Json Schema 
   * 
   * @param array - the input array
   * 
   * @returns Another Array with strings Json Schema  attributes 
   */

     getBody(array: ConfigClientData[]): string[] {
    
      array = this.jsonTableBody?.config; // Usar el operador de seguridad de navegación
      
      const attributes: string[] = [];
      if (array) { // Verificar si array está definido
        array.forEach(config => {
          attributes.push(config.ID);
        });
      }
      return attributes;
    }

    /**
   * Get the data types from the JSON schema
   *
   * @param array - the input array
   *
   * @returns Another array with the data types from the JSON schema as strings
   */
    getType(array: ConfigClientData[]): string[] {
      array = this.jsonTableBody?.config; // Usar el operador de seguridad de navegación
      
      const types: string[] = [];
      if (array) { // Verificar si array está definido
        array.forEach(config => {
          types.push(config.Type);
        });
      }
  
      return types;
    }

  /**
   * Get the headers
   *
   * @returns An array with the headers
   */
  getHeaders() {
    return this.getHeader(this.headerArray);
  }


  /**
   * Get the attributes
   *
   * @returns An array with the attributes
   */
  getAttributes() {
    return this.getBody(this.bodyArray);
  }

  /**
   * Get the types
   *
   * @returns An array with the types
   */
  getTypes() {
    return this.getType(this.typeArray);
  }

  onUpdateClick(){
    this.onUpdate.emit(this.client);
  }

  onDeleteClick(){
    this.onDelete.emit(this.client);
  }

  onDetailClick(){
    this.onDetail.emit(this.client);
  }

  compareDatesWithOffset(): boolean {
    const inscriptionDate = new Date(this.client.inscription);
    const currentDate = new Date();
    const oneMonthLater = new Date(inscriptionDate.getFullYear(), inscriptionDate.getMonth() + 1, inscriptionDate.getDate());
    return currentDate >= oneMonthLater
  }
  
  
}
