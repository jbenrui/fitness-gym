export interface ConfigGroup {
    config: ConfigGroupData[];
  }
  
  export interface ConfigGroupData {
    ID: string;
    LabelEN: string;
    LabelES: string;
    Type: "string";
    Value: string;
  }
  