import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonAccordionGroup, IonDatetime } from '@ionic/angular';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { LocaleService } from '../../services/local.service';

export const USER_PROFILE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateSelectableComponent),
  multi: true
};

@Component({
  selector: 'app-date-selectable',
  templateUrl: './date-selectable.component.html',
  styleUrls: ['./date-selectable.component.scss'],
  providers:[USER_PROFILE_VALUE_ACCESSOR]
})
export class DateSelectableComponent implements OnInit {

  hasValue = false;

  @Input() atributeName:string = "";

  constructor(
    private translateData:LocaleService
  ) { }

  ngOnDestroy(): void {
    this.dateSubject.complete()
  }

  private dateSubject = new BehaviorSubject(this.formatDate(moment()))
  public date$ = this.dateSubject.asObservable();
  propagateChange = (_: any) => { }

  isDisabled:boolean = false;

  formatDate(date:moment.Moment){
    return date.format('YYYY-MM-DDTHH:mmZ');
  }

  ngOnInit() {}

  writeValue(obj: any): void {
    if(obj){
      this.hasValue = true;
      this.dateSubject.next(this.formatDate(moment(obj)));
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

  onDateTimeChanged(event:any, accordion:IonAccordionGroup){
    setTimeout(() => {

      var value = this.formatDate(moment(event.detail.value));
      
      this.dateSubject.next(value);

      accordion.value = '';
      this.propagateChange(value);

    }, 100);
  }

  onCancel(datetime:IonDatetime, accordion:IonAccordionGroup){
    datetime.cancel();
    accordion.value='';
  }

  onConfirm(datetime:IonDatetime, accordion:IonAccordionGroup){
    datetime.confirm();
    accordion.value = '';
    this.hasValue = true;
  }

  getLocale(): string {
    return this.translateData.locale;
  }

}