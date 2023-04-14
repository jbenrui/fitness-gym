export interface ConfigUserDataForm {
    config: ConfigUserForm[]
  }
  
  export interface ConfigUserForm {
    ID: string
    Label: string
    Type: string
    Value: string
    Validators: ConfigUserValidatorsForm
  }
  
  export interface ConfigUserValidatorsForm {
    required?: boolean
    minLength?: number
    pattern?: string
  }