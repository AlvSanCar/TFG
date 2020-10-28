import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuentaPage } from './cuenta.page';

const routes: Routes = [
  {
    path: '',
    component: CuentaPage
  },
  {
    path: 'matricula',
    loadChildren: () => import('./matricula/matricula.module').then( m => m.MatriculaPageModule)
  },
  {
    path: 'modif-matricula',
    loadChildren: () => import('./modif-matricula/modif-matricula.module').then( m => m.ModifMatriculaPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'nueva-matricula',
    loadChildren: () => import('./nueva-matricula/nueva-matricula.module').then( m => m.NuevaMatriculaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuentaPageRoutingModule {}
