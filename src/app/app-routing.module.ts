import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'config-user',
    loadChildren: () => import('./pages/config-user/config-user.module').then( m => m.ConfigUserPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'groups',
    loadChildren: () => import('./pages/groups/groups.module').then( m => m.GroupsPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'clients',
    loadChildren: () => import('./pages/clients/clients.module').then( m => m.ClientsPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'aboutme',
    loadChildren: () => import('./pages/aboutme/aboutme.module').then( m => m.AboutmePageModule),
    canActivate:[AuthGuard]
  },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
