import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevaMatriculaPage } from './nueva-matricula.page';

const routes: Routes = [
  {
    path: '',
    component: NuevaMatriculaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevaMatriculaPageRoutingModule {}
