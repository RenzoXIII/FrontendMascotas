import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ModeloIdentificar } from '../modelos/identificar.modelo';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  url = 'https://backend-mascotas.onrender.com'
  datosUsuarioEnSesion = new BehaviorSubject<ModeloIdentificar>(new ModeloIdentificar());

  constructor(private http: HttpClient) { 
    this.VerificarSesionActual();
  }

  VerificarSesionActual(){
    let datos = this.ObtenerInformacionSesion();
    if(datos){
      this.RefrescarDatosSesion(datos);
    }
  }

  RefrescarDatosSesion(datos: ModeloIdentificar){
    this.datosUsuarioEnSesion.next(datos);
  }

  ObtenerDatosUsuarioEnSesion(){
    return this.datosUsuarioEnSesion.asObservable();
  }

  Identificar(usuario: string, contrasena: string): Observable<ModeloIdentificar>{
    return this.http.post<ModeloIdentificar>(`${this.url}/identificarUsuario`, {
      usuario: usuario,
      contrasena: contrasena
    },{
      headers: new HttpHeaders({

      })
    })
  }

  AlmacenarSesion(datos: ModeloIdentificar){
    datos.estaIdentificado = true;
    if(typeof datos.datos != "undefined" && typeof datos.datos.rol != "undefined"){
      datos.rolActivo = datos.datos.rol;
    };
    let stringDatos = JSON.stringify(datos);
    sessionStorage.setItem("datosSesion", stringDatos);
    this.RefrescarDatosSesion(datos);
  }

  ObtenerInformacionSesion(){
    let datosString = sessionStorage.getItem("datosSesion");
    if(datosString){
      let datos = JSON.parse(datosString);
      return datos;
    }else{
      return null;
    }
  }

  EliminarInformacionSesion(){
    sessionStorage.removeItem("datosSesion");
    this.RefrescarDatosSesion(new ModeloIdentificar());
  }

  SeHaIniciadoSesion(){
    let datosString = sessionStorage.getItem("datosSesion");
    return datosString;
  }

  ObtenerToken(){
    let datosString = sessionStorage.getItem("datosSesion");
    if(datosString){
      let datos = JSON.parse(datosString);
      return datos.tk;
    }else{
      return '';
    }
  }
}

