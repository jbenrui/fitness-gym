import { Injectable } from '@angular/core';
import { UserSVC } from './user.service';
import { groupGym } from '../models/group_model_gym';
import { GroupSvcService } from './group-svc.service';

@Injectable({
  providedIn: 'root'
})
export class ClientsInGroupService {

  constructor(
    private userSVC: UserSVC,
    private groupSVC: GroupSvcService
  ) { }

  async listClientsNotInGroup(group: groupGym): Promise<any[]> {
    const allUsers = await this.userSVC.getUserList(); // Obtener todos los usuarios
    const groupClients = group.clients; // Obtener los clientes del grupo

    // Filtrar los usuarios que no están en el grupo
    const clientsNotInGroup = allUsers.filter(user => !groupClients.includes(user.uid));

    // Mapear los usuarios al formato deseado (solo mostrar el ID)
    const clientsList = clientsNotInGroup.map(user => user.uid);

    return clientsList;
  }
}

