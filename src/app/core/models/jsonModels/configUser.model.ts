export interface ConfigUser {
    config: ConfigUserData[]
  }
  
  export interface ConfigUserData {
    ID: string;
    LabelEN: string;
    LabelES: string;
    Type: string;
    Value: string;
  }