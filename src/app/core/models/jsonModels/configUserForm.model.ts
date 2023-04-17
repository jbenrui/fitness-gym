export interface ConfigUserDataForm {
    config: ConfigUserForm[]
  }
  
  export interface ConfigUserForm {
    ID: string
    LabelEN: string
    LabelES: string
    Type: string
    Value: string
    Validators: ConfigUserValidatorsForm
  }
  
  export interface ConfigUserValidatorsForm {
    required?: boolean
    minLength?: number
    pattern?: string
  }