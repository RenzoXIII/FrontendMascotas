import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './usuarios/editar-usuario/editar-usuario.component';
import { ConsultarUsuarioComponent } from './usuarios/consultar-usuario/consultar-usuario.component';
import { EliminarUsuarioComponent } from './usuarios/eliminar-usuario/eliminar-usuario.component';
import { CrearMascotaComponent } from './mascotas/crear-mascota/crear-mascota.component';
import { EditarMascotaComponent } from './mascotas/editar-mascota/editar-mascota.component';
import { ConsultarMascotaComponent } from './mascotas/consultar-mascota/consultar-mascota.component';
import { EliminarMascotaComponent } from './mascotas/eliminar-mascota/eliminar-mascota.component';
import { EliminarPlanComponent } from './planes/eliminar-plan/eliminar-plan.component';
import { CrearPlanComponent } from './planes/crear-plan/crear-plan.component';
import { EditarPlanComponent } from './planes/editar-plan/editar-plan.component';
import { ConsultarPlanComponent } from './planes/consultar-plan/consultar-plan.component';
import { CrearSucursalComponent } from './sucursales/crear-sucursal/crear-sucursal.component';
import { EditarSucursalComponent } from './sucursales/editar-sucursal/editar-sucursal.component';
import { ConsultarSucursalComponent } from './sucursales/consultar-sucursal/consultar-sucursal.component';
import { EliminarSucursalComponent } from './sucursales/eliminar-sucursal/eliminar-sucursal.component';
import { CrearProductoComponent } from './productos/crear-producto/crear-producto.component';
import { EditarProductoComponent } from './productos/editar-producto/editar-producto.component';
import { ConsultarProductoComponent } from './productos/consultar-producto/consultar-producto.component';
import { EliminarProductoComponent } from './productos/eliminar-producto/eliminar-producto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrearClienteComponent } from './usuarios/crear-cliente/crear-cliente.component';
import { FiltrarMascotaComponent } from './mascotas/filtrar-mascota/filtrar-mascota.component';


@NgModule({
  declarations: [
    CrearUsuarioComponent,
    EditarUsuarioComponent,
    ConsultarUsuarioComponent,
    EliminarUsuarioComponent,
    CrearMascotaComponent,
    EditarMascotaComponent,
    ConsultarMascotaComponent,
    EliminarMascotaComponent,
    EliminarPlanComponent,
    CrearPlanComponent,
    EditarPlanComponent,
    ConsultarPlanComponent,
    CrearSucursalComponent,
    EditarSucursalComponent,
    ConsultarSucursalComponent,
    EliminarSucursalComponent,
    CrearProductoComponent,
    EditarProductoComponent,
    ConsultarProductoComponent,
    EliminarProductoComponent,
    CrearClienteComponent,
    FiltrarMascotaComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
