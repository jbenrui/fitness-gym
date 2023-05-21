import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { ConfigUserForm } from '../../models/jsonModels/configUserForm.model';
import { User } from '../../models/user_model_gym';
import { TranslateService } from '@ngx-translate/core';
import { PlatformService } from '../../services/platform.service';
import { PhotoItem, PhotoService } from '../../services/photo.service';
import { ok } from 'assert';

export interface ConfigUser {
  config: ConfigUserForm[]
}

@Component({
  selector: 'app-edit-user-form',
  templateUrl: './edit-user-form.component.html',
  styleUrls: ['./edit-user-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class EditUserFormComponent implements OnInit {

  form:FormGroup;
  mode: "New" | "Edit" = "New"; 

  currentImage = new BehaviorSubject<string>("");
  currentImage$ = this.currentImage.asObservable();

  /**
   * Array to store header data for ConfigUserData type
   */
  headerArray: ConfigUserForm[] = [];

  @Input() user:User;
  @Input() jsonConfigUserForm!: ConfigUser;

  constructor(
    private fb:FormBuilder,
    private translate:TranslateService,
    private modalController:ModalController,
    public platform:PlatformService,
    private photoSvc:PhotoService,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      pictureFile:[null]
    });
    
   }

  /**
   * Get Header of Json Schema 
   * 
   * @param array - the input array
   * 
   * @returns Another Array with strings Json Schema Labels 
   */
  getHeader(array: ConfigUserForm[]): string[] {
    array = this.jsonConfigUserForm?.config; // Usar el operador de seguridad de navegación
    
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

  createForm(controls: ConfigUserForm[]) {
    this.form.addControl('uid', this.fb.control(this.user.uid));
    this.form.addControl('email', this.fb.control(this.user.email));
    for (const control of controls) {
      this.form.addControl(control.ID, this.fb.control(this.user[control.ID]));
    }
    
    this.form.addControl('photo', this.fb.control(this.user.photo));
    // Add the attribute only if it already exist in the variable
    if(this.user.photo){
      this.currentImage.next(this.user.photo);
    }

    this.mode = "Edit"
  }
  
  async changePic(fileLoader:HTMLInputElement, mode:'library' | 'camera' | 'file'){
    var item:PhotoItem = await this.photoSvc.getPicture(mode, fileLoader);
    this.currentImage.next(item.base64);
    this.cdr.detectChanges();
    this.form.controls['pictureFile'].setValue(item.blob);
  }

  onDismiss(){
    this.modalController.dismiss(null,'cancel');
  }

  ngOnInit() {
    this.createForm(this.jsonConfigUserForm.config);
  }

  onSubmit(){
    console.log(this.form.value);
    this.modalController.dismiss({user:this.form.value, mode: this.mode},'ok')
  }

}
