import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CuentaService } from "../cuenta.service";

@Component({
  selector: 'app-nueva-matricula',
  templateUrl: './nueva-matricula.page.html',
  styleUrls: ['./nueva-matricula.page.scss'],
})
export class NuevaMatriculaPage implements OnInit {

  private usrID;
  private m1 = "";
  private m2 = "";
  private m3 = "";
  private usuario:{
    matricula1:'',
    matricula2:'',
    matricula3:''
  };

  private matricula1 = ""
  private matricula2 = ""
  private matricula3 = ""
  
  constructor(private actRouter:ActivatedRoute,private cuentaService: CuentaService,
              private router: Router) { }

  ngOnInit() {

    this.actRouter.paramMap.subscribe(paramMap => {
      this.usrID = paramMap.get('usrID')
      this.cuentaService.getUsarioServ(this.usrID).subscribe(
        data => {
          this.usuario =data[0];
          this.matricula1 = this.usuario.matricula1;
          this.matricula2  = this.usuario.matricula2;
          this.matricula3 = this.usuario.matricula3;
          this.m1 = this.usuario.matricula1;
          this.m2  = this.usuario.matricula2;
          this.m3 = this.usuario.matricula3;
          console.log(this.usuario)
        }
      );
 
    })
  }

  registraMatriculas(){
    
    this.cuentaService.newMatricula(this.matricula1,this.matricula2,this.matricula3,this.usrID).subscribe(
      data =>{
        if (data == 1){ this.salir()}
      }
    )
  }
  salir (){
    this.router.navigate(['/cuenta',this.usrID])
  }

}
