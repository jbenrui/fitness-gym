<<<<<<< HEAD
import { AbstractControl, ValidationErrors } from "@angular/forms";

export class PasswordValidation {
    static passwordMatch(control: AbstractControl):ValidationErrors {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirm_password')?.value;
      console.log("Password: "+password + ", confirm: "+confirmPassword);
      if(password != confirmPassword){
        let errors = control?.errors;
        if (errors && typeof errors === 'object') {
          Object.assign(errors, {
            passwordMatch: true
          });
        } else {
          errors = {
            passwordMatch: true
          };
        }
        return errors;
      }
      else{
        let errors = control?.errors;
        if (errors && typeof errors === 'object') {
          if(errors["passwordMatch"])
            delete errors["passwordMatch"];
        }
        return control.errors; 
      }
    }
  
    static passwordProto(control: AbstractControl) {
      const password = control.get('password')?.value;
      if(password && !password.match(/^(?=.*\d)(?=.*[a-zá-ú\u00f1ä-ü])(?=.*[A-ZÁ-Ú\u00d1Ä-Ü])[0-9a-zá-úä-üA-ZÁ-ÚÄ-Ü \u00d1$-/@:-?{-~!"^_`\[\]]{8,}$/)){
        let errors = control?.errors;
        if (errors && typeof errors === 'object') {
          Object.assign(errors, {
            passwordProto: true
          });
        } else {
          errors = {
            passwordProto: true
          };
        }
        return errors;
      }
      else{
        let errors = control?.errors;
        if (errors && typeof errors === 'object') {
          if(errors["passwordProto"])
            delete errors["passwordProto"];
        }
        return control.errors; 
      }  
    }
=======
import { AbstractControl, ValidationErrors } from "@angular/forms";

export class PasswordValidation {
    static passwordMatch(control: AbstractControl):ValidationErrors {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirm_password')?.value;
      console.log("Password: "+password + ", confirm: "+confirmPassword);
      if(password != confirmPassword){
        let errors = control?.errors;
        if (errors && typeof errors === 'object') {
          Object.assign(errors, {
            passwordMatch: true
          });
        } else {
          errors = {
            passwordMatch: true
          };
        }
        return errors;
      }
      else{
        let errors = control?.errors;
        if (errors && typeof errors === 'object') {
          if(errors["passwordMatch"])
            delete errors["passwordMatch"];
        }
        return control.errors; 
      }
    }
  
    static passwordProto(control: AbstractControl) {
      const password = control.get('password')?.value;
      if(password && !password.match(/^(?=.*\d)(?=.*[a-zá-ú\u00f1ä-ü])(?=.*[A-ZÁ-Ú\u00d1Ä-Ü])[0-9a-zá-úä-üA-ZÁ-ÚÄ-Ü \u00d1$-/@:-?{-~!"^_`\[\]]{8,}$/)){
        let errors = control?.errors;
        if (errors && typeof errors === 'object') {
          Object.assign(errors, {
            passwordProto: true
          });
        } else {
          errors = {
            passwordProto: true
          };
        }
        return errors;
      }
      else{
        let errors = control?.errors;
        if (errors && typeof errors === 'object') {
          if(errors["passwordProto"])
            delete errors["passwordProto"];
        }
        return control.errors; 
      }  
    }
>>>>>>> 013b82b0a1f57d89709e310a207ac7edf3e3733b
  }