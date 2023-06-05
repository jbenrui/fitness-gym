import { clientGym } from "./client_model_gym";

export interface groupGym {
    id:number,
    docId:string,
    name:string,
    description:string,
    photo:string,
    clients:string[];
    docMonitor:string
}