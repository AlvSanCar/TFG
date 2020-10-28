import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CuentaPageRoutingModule } from './cuenta-routing.module';
import {ModifMatriculaPage} from './modif-matricula/modif-matricula.page'
import { CuentaPage } from './cuenta.page';
import { ModifMatriculaPageModule } from './modif-matricula/modif-matricula.module';
import { MatriculaPage } from './matricula/matricula.page';
import { MatriculaPageModule } from './matricula/matricula.module';

@NgModule({
  entryComponents:[
    ModifMatriculaPage,
    MatriculaPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CuentaPageRoutingModule ,
    ModifMatriculaPageModule,
    MatriculaPageModule
  ],
  declarations: [CuentaPage]
})
export class CuentaPageModule {}
