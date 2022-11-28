import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloSucursal } from '../modelos/sucursal.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  url = 'http://localhost:3000';
  token: String = '';

  constructor(private http: HttpClient,
    private seguridadServicio: SeguridadService) { 
    this.token = this.seguridadServicio.ObtenerToken();
  }

  ObtenerSucursales(): Observable<ModeloSucursal[]> {
    return this.http.get<ModeloSucursal[]>(`${this.url}/sucursales`)
  }

  ObtenerSucursalesPorId(id: String): Observable<ModeloSucursal> {
    return this.http.get<ModeloSucursal>(`${this.url}/sucursales/${id}`)
  }

  CrearSucursal(sucursal: ModeloSucursal): Observable<ModeloSucursal> {
    return this.http.post<ModeloSucursal>(`${this.url}/sucursales`, sucursal, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }

  EditarSucursal(sucursal: ModeloSucursal): Observable<ModeloSucursal> {
    return this.http.patch<ModeloSucursal>(`${this.url}/sucursales/${sucursal.id}`, sucursal, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }

  EliminarSucursal(id: String): Observable<any> {
    return this.http.delete(`${this.url}/sucursales/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }
}
