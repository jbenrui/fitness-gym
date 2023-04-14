import { Component, Input, OnInit } from '@angular/core';
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


  headerArray:ConfigUserData[]=[];
  typeArray:ConfigUserData[]=[];
  bodyArray:ConfigUserData[]=[];

  @Input() user!:User
  @Input() jsonConfigUser!:ConfigUser 
  constructor(
    private translate : TranslateService,
    private userSVC:UserSVC
  ) {}

  ngOnInit() {
  }

  signOut(){
    this.userSVC.signOut();
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
      if(this.translate.getLangs()[0] === "en"){
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

  getHeaders(){
    return this.getHeader(this.headerArray);
  }

  getAttributes(){
    return this.getBody(this.bodyArray);
  }

  getTypes(){
    return this.getType(this.typeArray);
  }
}