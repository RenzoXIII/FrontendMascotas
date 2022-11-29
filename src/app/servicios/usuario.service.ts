import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloUsuario } from '../modelos/usuario.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url = 'https://backend-mascotas.onrender.com';
  token: String = '';

  constructor(private http: HttpClient,
    private seguridadServicio: SeguridadService) { 
    this.token = this.seguridadServicio.ObtenerToken();
  }

  ObtenerUsuarios(): Observable<ModeloUsuario[]> {
    return this.http.get<ModeloUsuario[]>(`${this.url}/usuarios`)
  }

  ObtenerUsuariosPorRol(rol: String): Observable<ModeloUsuario[]> {
    return this.http.get<ModeloUsuario[]>(`${this.url}/usuarios?filter[where][rol]=${rol}`)
  }

  ObtenerUsuariosPorCorreo(correo: String): Observable<ModeloUsuario[]> {
    return this.http.get<ModeloUsuario[]>(`${this.url}/usuarios?filter[where][correo]=${correo}`)
  }

  ObtenerUsuariosPorId(id: String): Observable<ModeloUsuario> {
    return this.http.get<ModeloUsuario>(`${this.url}/usuarios/${id}`)
  }

  CrearUsuario(usuario: ModeloUsuario): Observable<ModeloUsuario> {
    return this.http.post<ModeloUsuario>(`${this.url}/usuarios`, usuario, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }

  EditarUsuario(usuario: ModeloUsuario): Observable<ModeloUsuario> {
    return this.http.patch<ModeloUsuario>(`${this.url}/usuarios/${usuario.id}`, usuario, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }

  RecuperarContrasenaUsuario(usuario: ModeloUsuario): Observable<ModeloUsuario> {
    return this.http.patch<ModeloUsuario>(`${this.url}/recuperarContrasena/${usuario.id}`, usuario, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }

  EliminarUsuario(id: String): Observable<any> {
    return this.http.delete(`${this.url}/usuarios/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }
}
