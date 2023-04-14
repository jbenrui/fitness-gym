import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfigUserDataForm } from 'src/app/core/models/jsonModels/configUserForm.model';
import { UserSVC } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-config-user',
  templateUrl: './config-user.page.html',
  styleUrls: ['./config-user.page.scss'],
})
export class ConfigUserPage implements OnInit {

  userdata: any;

  public jsonConfigUserForm : ConfigUserDataForm  
  public jsonConfigUser : any = {};
  constructor(
    protected user:UserSVC,
    private http:HttpClient,
    ) 
    {
      this.http.get('assets/json/form-edit-user.json').subscribe((jsonConfigUserForm:ConfigUserDataForm) => {
        this.jsonConfigUserForm = jsonConfigUserForm;  
      });

      this.http.get('assets/json/config-user.json').subscribe((jsonConfigUser:ConfigUserDataForm) => {
        this.jsonConfigUser = jsonConfigUser;  

      });

      
    } 

    ngOnInit() {}
    
}

