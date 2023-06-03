import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { clientGym } from '../models/client_model_gym';
import { FileUploaded, FirebaseService } from './firebase/firebase-service';
import { DocumentData } from 'firebase/firestore';
import cli from '@angular/cli';

@Injectable({
  providedIn: 'root'
})
export class ClientSvcService {
  
  private _clientSubject:BehaviorSubject<clientGym[]> = new BehaviorSubject([]);
  public client = this._clientSubject.asObservable();

  unsubscr;
  constructor(
    private firebase:FirebaseService
  ) { 
    this.unsubscr = this.firebase.subscribeToCollection('clientes',this._clientSubject,this.mapClient)
  }

  ngOnDestroy():void {
    this.unsubscr();
  }

  private mapClient(doc:DocumentData){
    return{
      id:0,
      docId:doc['id'],
      name:doc['data']().name,
      surname:doc['data']().surname,
      email:doc['data']().email,
      birthdate:doc['data']().birthdate,
      postal_code:doc['data']().postal_code,
      phone:doc['data']().phone,
      photo:doc['data']().photo,
      inscription:doc['data']().inscription
    }
  }

  getClientById(id:string):Promise<clientGym | undefined>{
    return new Promise<clientGym>(async (resolve,reject) => {
      try{
        var client = (await this.firebase.getDocument('clientes',id));
        resolve({
          id:0,
          docId:client.id,
          name:client.data.name,
          surname:client.data.surname,
          email:client.data.email,
          birthdate:client.data.birthdate,
          postal_code:client.data.postal_code,
          phone:client.data.phone,
          photo:client.data.photo,
          inscription:client.data.inscription

        });
      }catch(error){
        reject(error);
      }
    });
  }

  async deleteClient(client:clientGym){
    await this.firebase.deleteDocument('clientes',client.docId);
  }

  uploadImage(file):Promise<any>{  
    return new Promise(async (resolve, reject)=>{
      try {
        const data = await this.firebase.imageUpload(file);  
        resolve(data);
      } catch (error) {
        resolve(error);
      }
    });
  }

  async addClient(client:clientGym){
    var _client = {
      id:0,
      docId:client.docId,
      name:client.name,
      surname:client.surname,
      email:client.email,
      birthdate:client.birthdate,
      postal_code:client.postal_code,
      phone:client.phone,
      inscription:client.inscription
    };
    if(client['pictureFile']){
      var response:FileUploaded = await this.uploadImage(client['pictureFile']);
      _client['photo'] = response.file;
    }
    try {
      await this.firebase.createDocument('clientes',_client)
    }catch(error){
      console.log(error)
    }
  }

  async updateClient(client:clientGym){
    var _client = {
      id:0,
      docId:client.docId,
      name:client.name,
      surname:client.surname,
      email:client.email,
      birthdate:client.birthdate,
      postal_code:client.postal_code,
      phone:client.phone,
      inscription:client.inscription
    };
    if (client['pictureFile'] !== null && client['pictureFile'] !== undefined) {
      var response:FileUploaded = await this.uploadImage(client['pictureFile']);
      _client['photo'] = response.file;
    }
    try {
      await this.firebase.updateDocument('clientes', client.docId, _client);  
    } catch (error) {
      console.log(error);
    }
  }

  
}
