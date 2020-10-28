import { Injectable } from '@angular/core';
import { Cuenta } from "./matricula.model";
import {  HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  private matricula
  private query
  private usuario={
    id: '',
    pass:'' 
    }

  headers = new Headers({'Content-Type': 'application/json'});
  
  private usuarioLogado =[]
  private urlPost= "http://localhost/appdata/prueba2.php"
  
  private aparcamiento =[
    {
      plaza:'125',
      matricula:'8811DYV',
      fecha:'10/05/2020',
      hora:'10:50',
      esLibre: false
    },
    {
      plaza:'124',
      matricula:'9999TTT',
      fecha:'10/05/2020',
      hora:'15:50',
      esLibre: false
    }    
  ]
  constructor(private http: HttpClient) { }


  loginUsuarioServ(peticion){
    return  this.http.get<any>("http://localhost/appdata/login.php?id="+peticion.id+"&pass="+peticion.pass)

  }
  getUsarioServ (peticion){
    return  this.http.get<any>("http://localhost/appdata/getUser.php?id="+peticion)

  }
  delUsarioServ (){
    return  this.http.get<any>("http://localhost/appdata/delete.php")
  }

  modUsuarioServ(){
  
    return  this.http.get<any>("http://localhost/appdata/modify.php")
  }
  crearUsuarioServ(){}

  getUsuario (){
    return this.usuario
  }
  getMatriculaParking(matricula: string ){

    
    return this.http.get<any>("http://localhost/appdata/parking.php?matricula="+matricula)
  

    return
  }
  getMatriculasParking(){
    return [...this.aparcamiento]
  }
  addMatricula(matricula: string){
    
    
  }
  delMatricula(idMat:string, idUsr:string){
    return this.http.get<any>("http://localhost/appdata/delete.php?id="+idUsr+"&matID="+idMat)
  }
  modMatricula(matriculaNew:string,idMat,idUsr){
   return this.http.get<any>("http://localhost/appdata/modify.php?id="+idUsr+"&matNew="+matriculaNew+"&matID="+idMat)
  }

  newMatricula(m1,m2,m3,idUsr){

    let sql= "http://localhost/appdata/newMat.php?id="
    +idUsr
    +"&matricula1="+m1
    +"&matricula2="+m2
    +"&matricula3="+m3;
    console.log(sql)
    return this.http.get<any>(sql);
  }
}
