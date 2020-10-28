import { Component, OnInit } from '@angular/core';
import {  AlertController} from "@ionic/angular";
import { Validators } from "@angular/forms";
import { ActivatedRoute, Router    } from "@angular/router";
import { CuentaService } from "../cuenta/cuenta.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  usuarios = []

  usuario = {
    "id": '',
    "nombre":'',
    "apellido":'',
    "email":'',
    "password":'',
    "repeat":'',
    "matricula1":'',
    "matricula2":'',
    "matricula3":''
  }
  constructor(private cuentaService: CuentaService, private router: Router, 
    private  alertController: AlertController,private http:HttpClient) { }

  ngOnInit() {
  }

      
  async crearUsuario (){  
    let sql= "http://localhost/appdata/newUsr.php?id="
    +this.usuario.id 
    +"&nombre="+this.usuario.nombre
    +"&apellido="+this.usuario.apellido
    +"&email="+this.usuario.email
    +"&password="+this.usuario.password
    +"&matricula1="+this.usuario.matricula1
    +"&matricula2="+this.usuario.matricula2
    +"&matricula3="+this.usuario.matricula3;
    
  
    console.log(sql);
    this.http.get<any>(sql)
    .subscribe(
        data => {
          console.log("Hola que tal",data)
        },
        err => {
          console.log("Error: "+ err.error);
          console.log("Nombre: "+  err.name);
          console.log("Mensaje: "+ err.message);
          console.log("Estado:"+ err.status);
        
      }
    )
  }

}
