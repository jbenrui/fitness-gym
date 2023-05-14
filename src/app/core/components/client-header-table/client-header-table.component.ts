import { Component, Input, OnInit } from '@angular/core';
import { ConfigClient, ConfigClientData } from '../../models/jsonModels/configClient.model';
import { TranslateService } from '@ngx-translate/core';

export interface ConfigUser {
  config: ConfigClientData[]
}

@Component({
  selector: 'app-client-header-table',
  templateUrl: './client-header-table.component.html',
  styleUrls: ['./client-header-table.component.scss'],
})


export class ClientHeaderTableComponent implements OnInit {


  /**
   * Array to store header data for ConfigClientData type
   */
  headerArray: ConfigClientData[] = [];

  /**
   * Input property to receive jsonConfigClient data of type ConfigClient
   */
  @Input() jsonTableBody!: ConfigClient;
 


  constructor(
    private translate : TranslateService,
  ) { }
  
  ngOnInit() {}

   /**
   * Get Body of Json Schema 
   * 
   * @param array - the input array
   * 
   * @returns Another Array with strings Json Schema  attributes 
   */

   getHeader(array: ConfigClientData[]): string[] {
    array = this.jsonTableBody?.config; // Usar el operador de seguridad de navegación
    
   
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
   * Get the headers
   *
   * @returns An array with the headers
   */
  getHeaders() {
    return this.getHeader(this.headerArray);
}
  

}
