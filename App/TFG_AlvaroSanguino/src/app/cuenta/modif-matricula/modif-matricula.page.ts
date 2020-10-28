import { Component, OnInit, Input } from '@angular/core';
import { CuentaService } from "../cuenta.service";
import {  AlertController, ModalController} from "@ionic/angular";
import { ActivatedRoute, Router    } from "@angular/router";
@Component({
  selector: 'app-modif-matricula',
  templateUrl: './modif-matricula.page.html',
  styleUrls: ['./modif-matricula.page.scss'],
})
export class ModifMatriculaPage implements OnInit {

  @Input() matricula;
  @Input() usrID;
  @Input() matID;
  private usuario  
  constructor(private cuentaService: CuentaService,private actRouter:ActivatedRoute,
              private router:Router,private modalCtrl: ModalController) { }

  ngOnInit() {
    
  }

  salir(){
    this.modalCtrl.dismiss()
  }

  modiMatricula(matricula,matriculaNueva){
    this.cuentaService.modMatricula(matriculaNueva.value,this.matID,this.usrID).subscribe(
      data => {
      }
    );

    this.modalCtrl.dismiss()
    
  }

}
