import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { groupGym } from '../../models/group_model_gym';
import { ConfigGroup } from '../group/group.component';
import { ConfigGroupDataForm, ConfigGroupForm } from '../../models/jsonModels/configGroupForm.model';
import { TranslateService } from '@ngx-translate/core';
import { ModalController } from '@ionic/angular';
import { PlatformService } from '../../services/platform.service';
import { PhotoItem, PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss'],
})
export class GroupFormComponent implements OnInit {

  form:FormGroup;
  mode: "New" | "Edit" = "New"; 

  currentImage = new BehaviorSubject<string>("");
  currentImage$ = this.currentImage.asObservable();

  /**
 * Array to store header data for ConfigUserData type
 */
  headerArray: ConfigGroupDataForm[] = [];

  @Input() group:groupGym;
  @Input() jsonFormGroup!: ConfigGroupForm;
  
  constructor(
    private fb:FormBuilder,
    private translate:TranslateService,
    private modalController:ModalController,
    public platform:PlatformService,
    private photoSvc:PhotoService,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({

      pictureFile:[null],
    });

   }

  ngOnInit() {
    this.createForm(this.jsonFormGroup?.config);
  }

    /**
   * Get Header of Json Schema 
   * 
   * @param array - the input array
   * 
   * @returns Another Array with strings Json Schema Labels 
   */
    getHeader(array: ConfigGroupDataForm[]): string[] {
      array = this.jsonFormGroup?.config; // Usar el operador de seguridad de navegación
      
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

  createForm(controls: ConfigGroupDataForm[]) {
    if(this.group){
      this.form.addControl('id', this.fb.control(this.group.id));
      this.form.addControl('docId', this.fb.control(this.group.docId));
      for (const control of controls) {
        this.form.addControl(control.ID, this.fb.control(this.group[control.ID]));
      }
      this.form.addControl('photo', this.fb.control(this.group.photo));
      // Add the attribute only if it already exist in the variable
      if(this.group.photo){
        this.currentImage.next(this.group.photo);
      }
      this.mode = "Edit"
    }else{
      this.form.addControl('id', this.fb.control(null));
      this.form.addControl('docId', this.fb.control(''));
      for (const control of controls) {
        this.form.addControl(control.ID, this.fb.control(''));
      }
      this.form.addControl('photo', this.fb.control(''));
      this.form.addControl('pictureFile', this.fb.control(null));
      this.mode = "New"
    }
    
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

  onSubmit(){
    this.modalController.dismiss({client:this.form.value, mode: this.mode},'ok')
  }

}
