<<<<<<< HEAD
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
=======
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
>>>>>>> 013b82b0a1f57d89709e310a207ac7edf3e3733b
  }