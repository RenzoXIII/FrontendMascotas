import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SeguridadService } from '../servicios/seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class ValidadorRolGuard implements CanActivate {

  constructor(private servicioSeguridad: SeguridadService,
    private router: Router,
    private route: ActivatedRoute) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      
      if (this.servicioSeguridad.ObtenerInformacionSesion()) {
        const userRole = this.servicioSeguridad.ObtenerInformacionSesion().rolActivo;
        //alert(userRole)
        //alert(route.data['rol'])
        if (route.data['rol'] && route.data['rol'].indexOf(userRole) === -1) {
          this.router.navigate(['/inicio']);
          return false;
        }
        return true;
      }
  
      this.router.navigate(['/inicio']);
      return false;
    }
}
