import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User, UserLogin, UserRegister } from '../models/user_model_gym';
import { FirebaseService } from './firebase/firebase-service';
import { Router } from '@angular/router';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class UserSVC {

  private _isLogged = new BehaviorSubject<boolean>(false);
  public isLogged$ = this._isLogged.asObservable();
  private _user = new BehaviorSubject<User>(null);
  public user$ = this._user.asObservable();



  public currentUser:User;
  constructor(
    private firebase: FirebaseService,
    private router: Router
  ) { 
    this.init()
  }

  private async init(){
    this.firebase.isLogged$.subscribe(async (logged)=>{
      if(logged){
        try{
          this._user.next((await this.firebase.getDocument('usuarios', this.firebase.getUser().uid)).data as User);
          this.currentUser = await this.getUserById(this.firebase.getUser().uid);
          this.navigateToHome();
        }
        catch(error){
          console.log(error);
        }
      }
      this._isLogged.next(logged);
    });
    
  }


  //me deveulve el usuario autorizado.
  public getAuthUser(){
    
    console.log(this._isLogged.getValue);
  }
  private navigateToHome() {
    try {
      this.router.navigate(['home']);
    } catch (error) {
      console.log(error);
    }
  }

  public async login(dataUsers: UserLogin){
    try {
      if (!this._isLogged.value) {
        await this.firebase.connectUserWithEmailAndPassword(dataUsers.identifier, dataUsers.password);
      } else {
        throw new Error('Already connected');
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public signOut() {
    this.firebase.signOut();
    this.router.navigate(['login']);
  }

  public async recoverPassword(email:string){
    console.log(email)
    await this.firebase.resetPassword(email);
  }
  
  public async register(data: UserRegister){
    try {
      if (!this._isLogged.value) {
        const user = await this.firebase.createUserWithEmailAndPassword(data.email, data.password);
        const userData = {
          uid: user.user.uid,
          username: data.username,
          first_name: data.first_name, 
          last_name: data.last_name,
          birthdate:data.birthdate,
          email: data.email,
          phone: data.phone,
          photo: "",
          dni:data.dni,
          provider: "firebase",
          token: await user.user.getIdToken(),
        };
        await this.firebase.createDocumentWithId('usuarios', userData, user.user.uid);
        await this.firebase.connectUserWithEmailAndPassword(data.email, data.password);
      } else {
        throw new Error('Already connected');
      } 
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  getUserList(){
    return this._user.value;
  }

  getUserById(id:string):Promise<User>{
    return new Promise<User>(async (resolve, reject)=>{
      try {
        var user = (await this.firebase.getDocument('usuarios', id));
        resolve({
          id:0,
          docId: user.id,
          username: user.data['username'],
          first_name: user.data['first_name'],
          last_name: user.data['last_name'],
          birthdate: user.data['birthdate'],
          email: user.data['email'],
          password: user.data['password'],
          phone: user.data['phone'],
          dni: user.data['dni'],
          photo: user.data['photo'] 
        });  
      } catch (error) {
        reject(error);
      }
    });
  }

}
