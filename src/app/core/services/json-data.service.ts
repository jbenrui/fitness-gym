import { Injectable } from '@angular/core';
import { ConfigUserDataForm } from '../models/jsonModels/configUserForm.model';
import { HttpClient } from '@angular/common/http';
import { ConfigUser } from '../models/jsonModels/configUser.model';

@Injectable({
  providedIn: 'root'
})
export class JsonDataService {

  public jsonConfigUserForm : ConfigUserDataForm  
  public jsonConfigUser : ConfigUser
  constructor(
    private http:HttpClient

  ) { 

    


    this.http.get('assets/json/form-edit-user.json').subscribe((jsonConfigUser:ConfigUserDataForm) => {
      this.jsonConfigUserForm = jsonConfigUser;  
    });

  }
  
  async getSchema() {
    try {
      this.jsonConfigUser = await this.http.get<ConfigUser>('../../../../assets/json/config-user.json').toPromise();
      console.log('jsonConfigUser:', this.jsonConfigUser);
    } catch (error) {
      console.error('Error al cargar el archivo JSON:', error);
    }
  }
}



