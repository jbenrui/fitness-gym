export interface ConfigClientForm {
    config: ConfigClientDataForm[];
  }
  
  export interface ConfigClientDataForm {
    ID: string;
    LabelEN: string;
    LabelES: string;
    Type: string;
    Value: string;
    Validators: ConfigUserValidatorsForm;
  }
  
  export interface ConfigUserValidatorsForm {
    required?: boolean;
    minLength?: number;
    pattern?: string;
  }