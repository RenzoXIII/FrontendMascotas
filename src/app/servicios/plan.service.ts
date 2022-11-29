import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloPlan } from '../modelos/plan.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  url = 'https://backend-mascotas.onrender.com';
  token: String = '';

  constructor(private http: HttpClient,
    private seguridadServicio: SeguridadService) { 
    this.token = this.seguridadServicio.ObtenerToken();
  }

  ObtenerPlanes(): Observable<ModeloPlan[]> {
    return this.http.get<ModeloPlan[]>(`${this.url}/planes`)
  }

  ObtenerPlanesPorId(id: String): Observable<ModeloPlan> {
    return this.http.get<ModeloPlan>(`${this.url}/planes/${id}`)
  }

  CrearPlan(plan: ModeloPlan): Observable<ModeloPlan> {
    return this.http.post<ModeloPlan>(`${this.url}/planes`, plan, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }

  EditarPlan(plan: ModeloPlan): Observable<ModeloPlan> {
    return this.http.patch<ModeloPlan>(`${this.url}/planes/${plan.id}`, plan, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }

  EliminarPlan(id: String): Observable<any> {
    return this.http.delete(`${this.url}/plan/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }
}
