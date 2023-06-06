import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { groupGym } from '../../models/group_model_gym';
import { GroupSvcService } from '../../services/group-svc.service';
import { IonAccordionGroup } from '@ionic/angular';


export const USER_PROFILE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => GroupSelectableComponent),
  multi: true
};

@Component({
  selector: 'app-group-selectable',
  templateUrl: './group-selectable.component.html',
  styleUrls: ['./group-selectable.component.scss'],
  providers:[USER_PROFILE_VALUE_ACCESSOR]
})
export class GroupSelectableComponent implements OnInit, ControlValueAccessor {

  selectedGroup:groupGym = null;
  propagateChange = (_: any) => { }
  isDisabled:boolean = false;

  constructor(
    private groupSVC:GroupSvcService
  ) { }


  async writeValue(obj: any){
    try{
      this.selectedGroup = await this.groupSVC?.getGroupById(obj);
    }catch(error){
      console.log("No se ha podido recupera los datos: "+error);
    }
    
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  ngOnInit() {}

  getGroup(){
    return this.groupSVC.getGroupList();
  } 

  onGroupClick(group:groupGym, accordion:IonAccordionGroup){
    this.selectedGroup = group;
    accordion.value='';
    this.propagateChange(this.selectedGroup.docId);
  }

}
