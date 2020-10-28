import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevaMatriculaPageRoutingModule } from './nueva-matricula-routing.module';

import { NuevaMatriculaPage } from './nueva-matricula.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevaMatriculaPageRoutingModule
  ],
  declarations: [NuevaMatriculaPage]
})
export class NuevaMatriculaPageModule {}
