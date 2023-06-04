import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Monitor } from '../../models/monitor_model';
import { UserSVC } from '../../services/user.service';
import { Observable } from 'rxjs';
import { IonAccordionGroup } from '@ionic/angular';

export const USER_PROFILE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MonitorSelectableComponent),
  multi: true
};

@Component({
  selector: 'app-monitor-selectable',
  templateUrl: './monitor-selectable.component.html',
  styleUrls: ['./monitor-selectable.component.scss'],
  providers:[USER_PROFILE_VALUE_ACCESSOR]
})

export class MonitorSelectableComponent implements OnInit, ControlValueAccessor {

  selectedMonitor:Monitor = null;
  propagateChange = (_: any) => { }
  isDisabled:boolean = false;

  constructor(
    private userSVC:UserSVC
  ) { }


  async writeValue(obj: any){
    try{
      this.selectedMonitor = await this.userSVC?.getUserById(obj);
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

  getUser(){
    return this.userSVC.getUserList();
  } 

  onUserClicked(user:Monitor, accordion:IonAccordionGroup){
    this.selectedMonitor = user;
    accordion.value='';
    this.propagateChange(this.selectedMonitor.uid);
  }
}
