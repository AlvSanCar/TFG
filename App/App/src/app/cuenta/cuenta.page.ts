import { Component, OnInit } from '@angular/core';
import { CuentaService } from "./cuenta.service";
import {  AlertController} from "@ionic/angular";
import { ActivatedRoute, Router    } from "@angular/router";
import { ModalController } from '@ionic/angular';
import { ModifMatriculaPage } from './modif-matricula/modif-matricula.page';
import { MatriculaPage } from './matricula/matricula.page';
@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {
 
  private data:[]
  private us1
  private usuario={
    id: '',
    pass:'' 
    }
  private usrID
  usuariointento
  usuarioServ: [] 
  private matID
  
  


  private matriculaNueva= ''
  private avatarParking = "data:image/png;base64,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"
  constructor(private actRouter:ActivatedRoute,private cuentaService: CuentaService, 
              private router: Router, private  alertController: AlertController,
              private modal:ModalController) { }

  ngOnInit() {
    this.actRouter.paramMap.subscribe(paramMap => {
      this.usrID = paramMap.get('usuario')
      this.cuentaService.getUsarioServ(this.usrID).subscribe(
        data => {
          this.usuarioServ = data;
        }
      );
 
    })  
    
  }

  ionViewWillEnter(){

    this.cuentaService.getUsarioServ(this.usrID).subscribe(
      data => {
        this.usuarioServ = data;
      }
    );
  }

  async modMatricula(matricula,idMat){
    const modalElemento = await this.modal.create({
      component: ModifMatriculaPage,
      componentProps:{
        matricula: matricula,
        usrID: this.usrID,
        matID: idMat
      }
    })
    await modalElemento.present();
    await modalElemento.onDidDismiss();
    this.cuentaService.getUsarioServ(this.usrID).subscribe(
      data => {
        this.usuarioServ = data;
      }
    );

   
   
  }
  async delMatricula(idMat){
    const alertElemento = await this.alertController.create({
      header:'Alerta',
      message:'Estás seguro que quieres borrar la matricula',
      buttons:[
        {
          text: 'Cancelar',
          role:'cancel'
        },
        {
          text: 'Eliminar',
          handler:() =>{
            this.cuentaService.delMatricula(idMat,this.usrID).subscribe(data =>{
              this.usuario = data;   

              this.cuentaService.getUsarioServ(this.usrID).subscribe(data =>{
                this.usuarioServ = data;
                
                      
                })       
            })
          }
        }
      ]
    })
    
    await alertElemento.present();
    this.router.navigate(['/cuenta',this.usrID])
  }

  async mostrarMatricula (matricula,idMat){
    const modalElemento = await this.modal.create({
    component: MatriculaPage,
    componentProps:{
      matID: matricula,
      usrID: this.usrID
  
    }
  });
  await modalElemento.present(); 
 
}

async newMat (){
  
  let usuarioC:{
    id:'',
    matricula1:''
    matricula2:'',
    matricula3:''
    
  }
  const alertElemento = await this.alertController.create({
    header:'Alerta',
    message:'Ya tienes 3 matriculas en la aplicacion',
    buttons:[
      {
        text: 'OK',
        role:'cancel'
      }
    ]
  })

  for ( usuarioC of this.usuarioServ){
    if(usuarioC.matricula1.length != 0 &&
       usuarioC.matricula2.length != 0 &&
       usuarioC.matricula3.length != 0){
      await alertElemento.present();
    }
    else{
      this.router.navigate(['/nuevaMat',usuarioC.id]);

    }
  }
}
viewPerfil(){
  
  this.router.navigate(['/perfil',this.usrID])
}

cerrarSesion(){
  this.router.navigate(['/home'])
}
}
