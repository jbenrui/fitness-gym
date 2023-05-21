import { Component, Input, OnInit } from '@angular/core';
import { clientGym } from '../../models/client_model_gym';
import { TranslateService } from '@ngx-translate/core';
import { ConfigClientDataForm } from '../../models/jsonModels/configClientForm.model';
import { ModalController } from '@ionic/angular';

export interface ConfigClient {
  config: ConfigClientDataForm[]
}

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss'],
})
export class ClientDetailComponent implements OnInit {
   /**
    * Input property to receive Client data of type clientGym
    */
   @Input() client!:clientGym;
 
   /**
    * Array to store header data for ConfigClientData type
    */
   headerArray: ConfigClientDataForm[] = [];
 
   /**
    * Array to store body data for ConfigClientData type
    */
   bodyArray: ConfigClientDataForm[] = [];
 
   /**
    * Array to store type data for ConfigUserData type
    */
   typeArray: ConfigClientDataForm[] = [];
 
   /**
    * Input property to receive jsonConfigClient data of type ConfigClient
    */
   @Input() jsonFormClient!: ConfigClient;
  
 
 
   constructor(
     private translate : TranslateService,
     private modalController:ModalController,
   ) { }
   
   ngOnInit() {}
 
    /**
    * Get Header of Json Schema 
    * 
    * @param array - the input array
    * 
    * @returns Another Array with strings Json Schema  attributes 
    */
    getHeader(array: ConfigClientDataForm[]): string[] {
     array = this.jsonFormClient?.config;
     
    
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
      getBody(array: ConfigClientDataForm[]): string[] {
     
       array = this.jsonFormClient?.config; // Usar el operador de seguridad de navegación
       
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
     getType(array: ConfigClientDataForm[]): string[] {
       array = this.jsonFormClient?.config; // Usar el operador de seguridad de navegación
       
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
 
   compareDatesWithOffset(): boolean {
     const inscriptionDate = new Date(this.client.inscription);
     const currentDate = new Date();
     const oneMonthLater = new Date(inscriptionDate.getFullYear(), inscriptionDate.getMonth() + 1, inscriptionDate.getDate());
     return currentDate >= oneMonthLater
   }

   onDismiss(){
    this.modalController.dismiss(null,'cancel');
  }
}

