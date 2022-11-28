import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidadorSesionGuard } from 'src/app/guardianes/validador-sesion.guard';
import { CerrarSesionComponent } from './cerrar-sesion/cerrar-sesion.component';
import { IdentificacionComponent } from './identificacion/identificacion.component';
import { RecuperarClaveComponent } from './recuperar-clave/recuperar-clave.component';

const routes: Routes = [
  {
    path:'identificacion',
    component: IdentificacionComponent,
    title: 'Iniciar Sesión'
  },
  {
    path:'cerrar-sesion',
    component: CerrarSesionComponent,
    canActivate: [ValidadorSesionGuard],
    title: 'Cerrar Sesión'
  },
  {
    path:'recuperar-clave',
    component: RecuperarClaveComponent,
    title: 'Recuperación Contraseña'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
