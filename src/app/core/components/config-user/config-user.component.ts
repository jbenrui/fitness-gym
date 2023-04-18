import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserSVC } from '../../services/user.service';
import { User } from '../../models/user_model_gym';
import { ConfigUserData } from '../../models/jsonModels/configUser.model';
import { FormatDatePipe } from '../../utils/format-date.pipe';
import { TranslateService } from '@ngx-translate/core';

export interface ConfigUser {
  config: ConfigUserData[]
}

@Component({
  selector: 'app-config-user-component',
  templateUrl: './config-user.component.html',
  styleUrls: ['./config-user.component.scss'],
})
export class ConfigUserComponent implements OnInit {


  /**
 * Array to store header data for ConfigUserData type
 */
headerArray: ConfigUserData[] = [];

/**
 * Array to store type data for ConfigUserData type
 */
typeArray: ConfigUserData[] = [];

/**
 * Array to store body data for ConfigUserData type
 */
bodyArray: ConfigUserData[] = [];

/**
 * Input property to receive user data of type User
 */
@Input() user!: User;

/**
 * Input property to receive jsonConfigUser data of type ConfigUser
 */
@Input() jsonConfigUser!: ConfigUser;

/**
 * Output EventEmitter for update event
 * Emits an event when the update button is clicked
 */
@Output() onUpdate = new EventEmitter();
@Output() onLogout = new EventEmitter();
  
  constructor(
    private translate : TranslateService,
    private userSVC:UserSVC
  ) {
    
  }

  ngOnInit() {
  }




  /**
   * Get Body of Json Schema 
   * 
   * @param array - the input array
   * 
   * @returns Another Array with strings Json Schema  attributes 
   */

  getBody(array: ConfigUserData[]): string[] {
    
    array = this.jsonConfigUser?.config; // Usar el operador de seguridad de navegación
    
    const attributes: string[] = [];
    if (array) { // Verificar si array está definido
      array.forEach(config => {
        attributes.push(config.ID);
      });
    }
    return attributes;
  }


  /**
   * Get Header of Json Schema 
   * 
   * @param array - the input array
   * 
   * @returns Another Array with strings Json Schema Labels 
   */

  getHeader(array: ConfigUserData[]): string[] {
    array = this.jsonConfigUser?.config; // Usar el operador de seguridad de navegación
    
    const labels: string[] = [];
    if (array) { // Verificar si array está definido
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
   * Get the data types from the JSON schema
   *
   * @param array - the input array
   *
   * @returns Another array with the data types from the JSON schema as strings
   */
  getType(array: ConfigUserData[]): string[] {
    array = this.jsonConfigUser?.config; // Usar el operador de seguridad de navegación
    
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

/**
 * Event handler for update button click
 * Emits an event with the user data as payload
 */
onUpdateClick() {
  this.onUpdate.emit(this.user);
}

onLogoutClick(){
  this.onLogout.emit()
}



}