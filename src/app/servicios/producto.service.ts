import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloProducto } from '../modelos/producto.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url = 'https://backend-mascotas.onrender.com';
  token: String = '';

  constructor(private http: HttpClient,
    private seguridadServicio: SeguridadService) { 
    this.token = this.seguridadServicio.ObtenerToken();
  }

  ObtenerProductos(): Observable<ModeloProducto[]> {
    return this.http.get<ModeloProducto[]>(`${this.url}/productos-servicios`)
  }

  ObtenerProductosPorId(id: String): Observable<ModeloProducto> {
    return this.http.get<ModeloProducto>(`${this.url}/productos-servicios/${id}`)
  }

  CrearProducto(producto: ModeloProducto): Observable<ModeloProducto> {
    return this.http.post<ModeloProducto>(`${this.url}/productos-servicios`, producto, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }

  EditarProducto(producto: ModeloProducto): Observable<ModeloProducto> {
    return this.http.patch<ModeloProducto>(`${this.url}/productos-servicios/${producto.id}`, producto, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }

  EliminarProducto(id: String): Observable<any> {
    return this.http.delete(`${this.url}/productos-servicios/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }
}
