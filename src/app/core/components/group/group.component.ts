import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfigGroupData } from '../../models/jsonModels/configGroup.model';
import { TranslateService } from '@ngx-translate/core';
import { groupGym } from '../../models/group_model_gym';
import { UserSVC } from '../../services/user.service';

export interface ConfigGroup {
  config: ConfigGroupData[]
}

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {


    /**
   * Output EventEmitter for events
   * Emits an event when the buttons are clicked
   */
    @Output() onUpdate = new EventEmitter;
    @Output() onDelete = new EventEmitter;
    @Output() onDetail = new EventEmitter;
    
  /**
   * Array to store header data for ConfigGroupData type
   */
  headerArray: ConfigGroupData[] = [];

  /**
   * Array to store body data for ConfigGroupData type
   */
  bodyArray: ConfigGroupData[] = [];

  /**
   * Array to store type data for ConfigGroupData type
   */
  typeArray: ConfigGroupData[] = [];

  /**
   * Input property to receive group data of type groupGym
   */
  @Input() group:groupGym

  /**
   * Input property to receive jsonConfigGroup data of type ConfigGroup
   */
  @Input() jsonCardBody!: ConfigGroup;



  constructor(
    private translate : TranslateService,
    private userSVC : UserSVC
  ) { }

  ngOnInit() {
    console.log(this.group)
  }

  /**
   * Get Header of Json Schema 
   * 
   * @param array - the input array
   * 
   * @returns Another Array with strings Json Schema  attributes 
   */

  getHeader(array: ConfigGroupData[]): string[] {
    array = this.jsonCardBody?.config;
    
   
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

    getBody(array: ConfigGroupData[]): string[] {
    
      array = this.jsonCardBody?.config; // Usar el operador de seguridad de navegación
      
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
    getType(array: ConfigGroupData[]): string[] {
      array = this.jsonCardBody?.config; // Usar el operador de seguridad de navegación
      
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
    this.onUpdate.emit(this.group);
  }

  onDeleteClick(){
    this.onDelete.emit(this.group);
  }

  onDetailClick(){
    this.onDetail.emit(this.group);
  }

  getMonitorGroup(uid:string){
    //return this.userSVC.getUserById(uid);
    return uid
  }

}
