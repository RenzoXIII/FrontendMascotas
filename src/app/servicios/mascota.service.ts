import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloMascota } from '../modelos/mascota.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  url = 'https://backend-mascotas.onrender.com';
  token: String = '';

  constructor(private http: HttpClient,
    private seguridadServicio: SeguridadService) { 
    this.token = this.seguridadServicio.ObtenerToken();
  }

  ObtenerMascotas(): Observable<ModeloMascota[]> {
    return this.http.get<ModeloMascota[]>(`${this.url}/mascotas?filter={"include":["usuario","plan"]}`)
  }

  ObtenerMascotasPorId(id: String): Observable<ModeloMascota> {
    return this.http.get<ModeloMascota>(`${this.url}/mascotas/${id}`)
  }

  CrearMascota(mascota: ModeloMascota): Observable<ModeloMascota> {
    return this.http.post<ModeloMascota>(`${this.url}/mascotas`, mascota, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }

  EditarMascota(mascota: ModeloMascota): Observable<ModeloMascota> {
    return this.http.patch<ModeloMascota>(`${this.url}/mascotas/${mascota.id}`, mascota, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }

  EliminarMascota(id: String): Observable<any> {
    return this.http.delete(`${this.url}/mascotas/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }
}
