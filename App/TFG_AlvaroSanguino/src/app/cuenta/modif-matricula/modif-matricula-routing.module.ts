import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifMatriculaPage } from './modif-matricula.page';

const routes: Routes = [
  {
    path: '',
    component: ModifMatriculaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifMatriculaPageRoutingModule {}
