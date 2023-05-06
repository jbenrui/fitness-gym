import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User, UserLogin, UserRegister } from '../models/user_model_gym';
import { FileUploaded, FirebaseService } from './firebase/firebase-service';
import { Router } from '@angular/router';
import 'firebase/auth';
import { DocumentData } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserSVC {

  private _isLogged = new BehaviorSubject<boolean>(false);
  public isLogged$ = this._isLogged.asObservable(); // Observable para la propiedad isLogged

  private _user = new BehaviorSubject<any>(null);
  public user$ = this._user.asObservable(); // Observable para la propiedad user

  public currentUser:User; // Objeto para almacenar el usuario actual
  unsubcr; // Variable para almacenar el resultado de la suscripción

  constructor(
    private firebase: FirebaseService, // Inyección de dependencia de FirebaseService
    private router: Router // Inyección de dependencia de Router
  ) { 
    this.init(); // Llamada al método init() en el constructor
    this.unsubcr = this.firebase.subscribeToCollection('usuarios',this._user,this.mapUser); // Suscripción a la colección 'usuarios' en Firebase y mapeo de los documentos recibidos con el método mapUser()
  }

  /**
   * Maps data from a document to a user object.
   * 
   * @param doc - The data document
   * 
   * @returns A user object mapped with the data from the document
   */
  private mapUser(doc: DocumentData) {
    return {
      id: 0,
      uid: doc.id,
      username: doc.data().username,
      first_name: doc.data().first_name,
      last_name: doc.data().last_name,
      birthdate: doc.data().birthdate,
      email: doc.data().email,
      phone: doc.data().phone,
      dni: doc.data().dni,
      photo: doc.data().photo
    };
  }

  /**
   * Initializes the class.
   */
  private async init() {
    this.firebase.isLogged$.subscribe(async (logged) => {
      if (logged) {
        try {
          this._user.next((await this.firebase.getDocument('usuarios', this.firebase.getUser().uid)).data as User);
          this.currentUser = await this.getUserById(this.firebase.getUser().uid);
          this.navigateToHome();
        } catch (error) {
          console.log(error);
        }
      }
      this._isLogged.next(logged);
    });

  }

  /**
   * Uploads an image to the server.
   * 
   * @param file - The image file to upload
   * 
   * @returns A promise that resolves with the uploaded image data
   */
  uploadImage(file): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.firebase.imageUpload(file);
        resolve(data);
      } catch (error) {
        resolve(error);
      }
    });
  }

  /**
   * Updates user data.
   * 
   * @param user - The user object with updated data
   */
  async updateUser(user: User) {
    var _user = {
      uid: user.uid,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      birthdate: user.birthdate,
      email: user.email,
      phone: user.phone,
      dni: user.dni,
    };
    if (user['photo']) {
      console.log("pictureFIle: "+user['photo'])
      var response: FileUploaded = await this.uploadImage(user['photo']);
      _user['photo'] = response.file;
    }
    try {
      await this.firebase.updateDocument('usuarios', user.uid, _user);

    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Navigates to the home page.
   */
  private navigateToHome() {
    try {
      this.router.navigate(['home']);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Logs in a user.
   * 
   * @param dataUsers - The user login data
   */
  public async login(dataUsers: UserLogin) {
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

  /**
   * Signs out the user.
   */
  public signOut() {
    this.firebase.signOut();
    this.router.navigate(['login']);
  }

  /**
   * Recovers the password of a user.
   * 
   * @param email - The user's email
   */
  public async recoverPassword(email: string) {
    console.log(email)
    await this.firebase.resetPassword(email);
  }
    
  /**
   * Registers a new user.
   * 
   * @param data - The user registration data
   */
  public async register(data: UserRegister){
    try {
      if (!this._isLogged.value) {
        const user = await this.firebase.createUserWithEmailAndPassword(data.email, data.password);
        const userData = {
          uid: user.user.uid,
          username: data.username,
          first_name: data.first_name, 
          last_name: data.last_name,
          birthdate: data.birthdate,
          email: data.email,
          phone: data.phone,
          photo: "",
          dni: data.dni,
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

  /**
   * Gets the user list.
   * 
   * @returns The user list as an observable
   */
  getUserList(){
    return this._user.value;
  }

  /**
   * Gets a user by ID.
   * 
   * @param id - The ID of the user
   * 
   * @returns A promise that resolves with the user object
   */
  getUserById(id: string): Promise<User>{
    return new Promise<User>(async (resolve, reject)=>{
      try {
        var user = (await this.firebase.getDocument('usuarios', id));
        resolve({
          id:0,
          uid: user.id,
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
