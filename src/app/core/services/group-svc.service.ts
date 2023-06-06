import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { groupGym } from '../models/group_model_gym';
import { FileUploaded, FirebaseService } from './firebase/firebase-service';
import { DocumentData } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class GroupSvcService {

  private _groupSubject:BehaviorSubject<groupGym[]> = new BehaviorSubject([]);
  public group = this._groupSubject.asObservable();

  unsubscr;
  constructor(
    private firebase:FirebaseService
  ) { 
    this.unsubscr = this.firebase.subscribeToCollection('grupos',this._groupSubject,this.mapGroup)
  }

  ngOnDestroy():void {
    this.unsubscr();
  }

  private mapGroup(doc: DocumentData): groupGym {
    return {
      id: 0,
      docId: doc['id'],
      name: doc['data']().name,
      description: doc['data']().description,
      photo: doc['data']().photo,
      clients: doc['data']().clients,
      docMonitor: doc['data']().docMonitor
    };
  }

  getGroupById(id:string):Promise<groupGym | undefined>{
    return new Promise<groupGym>(async (resolve,reject) => {
      try{
        var group = (await this.firebase.getDocument('grupos',id));
        resolve({
          id:0,
          docId:group.id,
          name:group.data.name,
          description:group.data.description,
          photo:group.data.photo,
          clients:group.data.clients,
          docMonitor:group.data.docMonitor,

        });
      }catch(error){
        reject(error);
      }
    });
  }

  async deleteGroup(group:groupGym){
    await this.firebase.deleteDocument('grupos',group.docId);
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

  async addGroup(group:groupGym){
    var _group = {
      id:0,
      docId:group.docId,
      name:group.name,
      description:group.description,
      clients:group.clients,
      docMonitor:group.docMonitor,
    };
    if(group['pictureFile']){
      var response:FileUploaded = await this.uploadImage(group['pictureFile']);
      _group['photo'] = response.file;
    }
    try {
      await this.firebase.createDocument('grupos',_group)
    }catch(error){
      console.log(error)
    }
  }

  async updateGroup(group:groupGym){
    var _group = {
      id:0,
      docId:group.docId,
      name:group.name,
      description:group.description,
      clients:group.clients,
      docMonitor:group.docMonitor,
    };
    if (group['pictureFile'] !== null && group['pictureFile'] !== undefined) {
      var response:FileUploaded = await this.uploadImage(group['pictureFile']);
      _group['photo'] = response.file;
    }
    try {
      await this.firebase.updateDocument('grupos', group.docId, _group);  
    } catch (error) {
      console.log(error);
    }
  }


  getGroupList(){
    return this._groupSubject.value
  }

  
  //Añadir un clientes al grupo

  //Eleminar clientes del grupo
  
}
