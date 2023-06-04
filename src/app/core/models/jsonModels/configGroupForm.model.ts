export interface ConfigGroupForm {
    config: ConfigGroupDataForm[];
  }
  
export interface ConfigGroupDataForm {
    ID: string;
    LabelEN: string;
    LabelES: string;
    Type: string;
    Value: string | number | boolean | any[];
    Validators?: ConfigUserValidatorsForm;
  }
  
export interface ConfigUserValidatorsForm {
    required?: boolean;
    minLength?: number;
    pattern?: string;
  }