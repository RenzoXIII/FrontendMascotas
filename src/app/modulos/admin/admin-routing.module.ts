import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidadorRolGuard } from 'src/app/guardianes/validador-rol.guard';
import { ValidadorSesionGuard } from 'src/app/guardianes/validador-sesion.guard';
import { ConsultarMascotaComponent } from './mascotas/consultar-mascota/consultar-mascota.component';
import { CrearMascotaComponent } from './mascotas/crear-mascota/crear-mascota.component';
import { EditarMascotaComponent } from './mascotas/editar-mascota/editar-mascota.component';
import { EliminarMascotaComponent } from './mascotas/eliminar-mascota/eliminar-mascota.component';
import { FiltrarMascotaComponent } from './mascotas/filtrar-mascota/filtrar-mascota.component';
import { ConsultarPlanComponent } from './planes/consultar-plan/consultar-plan.component';
import { CrearPlanComponent } from './planes/crear-plan/crear-plan.component';
import { EditarPlanComponent } from './planes/editar-plan/editar-plan.component';
import { EliminarPlanComponent } from './planes/eliminar-plan/eliminar-plan.component';
import { ConsultarProductoComponent } from './productos/consultar-producto/consultar-producto.component';
import { CrearProductoComponent } from './productos/crear-producto/crear-producto.component';
import { EditarProductoComponent } from './productos/editar-producto/editar-producto.component';
import { EliminarProductoComponent } from './productos/eliminar-producto/eliminar-producto.component';
import { ConsultarSucursalComponent } from './sucursales/consultar-sucursal/consultar-sucursal.component';
import { CrearSucursalComponent } from './sucursales/crear-sucursal/crear-sucursal.component';
import { EditarSucursalComponent } from './sucursales/editar-sucursal/editar-sucursal.component';
import { EliminarSucursalComponent } from './sucursales/eliminar-sucursal/eliminar-sucursal.component';
import { ConsultarUsuarioComponent } from './usuarios/consultar-usuario/consultar-usuario.component';
import { CrearClienteComponent } from './usuarios/crear-cliente/crear-cliente.component';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './usuarios/editar-usuario/editar-usuario.component';
import { EliminarUsuarioComponent } from './usuarios/eliminar-usuario/eliminar-usuario.component';

const routes: Routes = [
  {
    path: 'crear-usuario',
    component:CrearUsuarioComponent,
    canActivate: [ValidadorSesionGuard, ValidadorRolGuard],
    title: 'Registrar Usuario',
    data: {rol: ['Admin', 'Asesor']}
  },
  {
    path: 'consultar-usuario',
    component:ConsultarUsuarioComponent,
    canActivate: [ValidadorSesionGuard],
    title: 'Listado Usuarios'
  },
  {
    path: 'editar-usuario/:id',
    component:EditarUsuarioComponent,
    canActivate: [ValidadorSesionGuard],
    title: 'Actualizar Usuario'
  },
  {
    path: 'eliminar-usuario',
    component:EliminarUsuarioComponent,
    canActivate: [ValidadorSesionGuard, ValidadorRolGuard],
    title: 'Eliminar Usuario',
    data: {rol: ['Admin']}
  },
  {
    path: 'crear-cliente',
    component:CrearClienteComponent,
  },


  {
    path: 'crear-producto',
    component:CrearProductoComponent,
    canActivate: [ValidadorSesionGuard, ValidadorRolGuard],
    title: 'Nuevo Producto',
    data: {rol: ['Admin']}
  },
  {
    path: 'consultar-producto',
    component:ConsultarProductoComponent,
    canActivate: [ValidadorSesionGuard],
    title: 'Listado Productos'
  },
  {
    path: 'editar-producto/:id',
    component:EditarProductoComponent,
    canActivate: [ValidadorSesionGuard, ValidadorRolGuard],
    title: 'Actualizar Producto',
    data: {rol: ['Admin']}
  },
  {
    path: 'eliminar-producto',
    component:EliminarProductoComponent,
    canActivate: [ValidadorSesionGuard, ValidadorRolGuard],
    title: 'Eliminar Producto',
    data: {rol: ['Admin']}
  },


  {
    path: 'crear-plan',
    component:CrearPlanComponent,
    canActivate: [ValidadorSesionGuard, ValidadorRolGuard],
    title: 'Nuevo Plan',
    data: {rol: ['Admin']}
  },
  {
    path: 'consultar-plan',
    component:ConsultarPlanComponent,
    canActivate: [ValidadorSesionGuard],
    title: 'Listado Planes',
  },
  {
    path: 'editar-plan/:id',
    component:EditarPlanComponent,
    canActivate: [ValidadorSesionGuard, ValidadorRolGuard],
    title: 'Actualizar Plan',
    data: {rol: ['Admin']}
  },
  {
    path: 'eliminar-plan',
    component:EliminarPlanComponent,
    canActivate: [ValidadorSesionGuard, ValidadorRolGuard],
    title: 'Eliminar Plan',
    data: {rol: ['Admin']}
  },


  {
    path: 'crear-sucursal',
    component:CrearSucursalComponent,
    canActivate: [ValidadorSesionGuard, ValidadorRolGuard],
    title: 'Nueva Sucursal',
    data: {rol: ['Admin']}
    
  },
  {
    path: 'consultar-sucursal',
    component:ConsultarSucursalComponent,
    canActivate: [ValidadorSesionGuard],
    title: 'Listado Sucursales',
  },
  {
    path: 'editar-sucursal/:id',
    component:EditarSucursalComponent,
    canActivate: [ValidadorSesionGuard, ValidadorRolGuard],
    title: 'Actualizar Sucursal',
    data: {rol: ['Admin']}
  },
  {
    path: 'eliminar-sucursal',
    component:EliminarSucursalComponent,
    canActivate: [ValidadorSesionGuard, ValidadorRolGuard],
    title: 'Eliminar Sucursal',
    data: {rol: ['Admin']}
  },


  {
    path: 'crear-mascota',
    component:CrearMascotaComponent,
    canActivate: [ValidadorSesionGuard],
    title: 'Nueva Solicitud Mascota',
  },
  {
    path: 'consultar-mascota',
    component:ConsultarMascotaComponent,
    canActivate: [ValidadorSesionGuard, ValidadorRolGuard],
    title: 'Consulta Solicitudes Mascotas',
    data: {rol: ['Admin','Asesor','Cliente']}
  },
  {
    path: 'filtrar-mascota/:id',
    component:FiltrarMascotaComponent,
    canActivate: [ValidadorSesionGuard, ValidadorRolGuard],
    title: 'Consulta Solicitudes Mascotas',
    data: {rol: ['Admin','Asesor']}
  },
  {
    path: 'editar-mascota/:id',
    component:EditarMascotaComponent,
    canActivate: [ValidadorSesionGuard, ValidadorRolGuard],
    title: 'Actualizar Solicitud Mascota',
    data: {rol: ['Admin','Asesor']}
  },
  {
    path: 'eliminar-mascota',
    component:EliminarMascotaComponent,
    canActivate: [ValidadorSesionGuard, ValidadorRolGuard],
    title: 'Eliminar Solicitud Mascota',
    data: {rol: ['Admin']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
