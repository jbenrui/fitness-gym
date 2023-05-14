export interface ConfigClient {
    config: ConfigClientData[];
  }
  
  export interface ConfigClientData {
    ID: string;
    LabelEN: string;
    LabelES: string;
    Type: string;
    Value: string;
  }
  