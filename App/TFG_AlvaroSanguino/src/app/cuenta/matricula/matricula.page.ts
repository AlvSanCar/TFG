import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute    } from "@angular/router";
import { CuentaService     } from '../cuenta.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.page.html',
  styleUrls: ['./matricula.page.scss'],
})
export class MatriculaPage implements OnInit {


  
  constructor(private actRouter:ActivatedRoute, private cuentaService:CuentaService,
              private modalCtrl:ModalController) { }
  @Input ()matID;
  private matriculas
  ngOnInit() {

    this.cuentaService.getMatriculaParking(this.matID).subscribe(
      data=>{
        this.matriculas = data
        if(this.matriculas == null){
          this.matriculas =[
            {
              plaza: "", matricula: "", fecha: "", hora: "", esLibre: "1"
            }
          ]
        console.log(this.matriculas)
        }
      }
    )

  }
  salir(){
    this.modalCtrl.dismiss()
  }
}
