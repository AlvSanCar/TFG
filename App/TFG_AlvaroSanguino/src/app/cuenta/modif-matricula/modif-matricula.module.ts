import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifMatriculaPageRoutingModule } from './modif-matricula-routing.module';

import { ModifMatriculaPage } from './modif-matricula.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifMatriculaPageRoutingModule
  ],
  declarations: [ModifMatriculaPage]
})
export class ModifMatriculaPageModule {}
