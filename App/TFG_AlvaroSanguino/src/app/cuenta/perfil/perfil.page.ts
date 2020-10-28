import { Component, OnInit } from '@angular/core';
import { CuentaService } from "../cuenta.service";
import {  AlertController} from "@ionic/angular";
import { ActivatedRoute, Router    } from "@angular/router";
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(private actRouter:ActivatedRoute,private cuentaService: CuentaService, 
    private router: Router, private  alertController: AlertController,
    private modal:ModalController) { }
  private usrID;
  private usuario={
    nombre:'',
    apellido:'',
    email:''
  }
  ngOnInit() {
    this.actRouter.paramMap.subscribe(paramMap => {
      this.usrID = paramMap.get('usrID')
      this.cuentaService.getUsarioServ(this.usrID).subscribe(
        data => {
          this.usuario = data[0];
        }
      );
    })  
  }

}
