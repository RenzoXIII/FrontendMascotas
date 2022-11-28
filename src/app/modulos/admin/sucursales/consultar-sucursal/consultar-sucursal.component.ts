import { Component } from '@angular/core';
import { ModeloSucursal } from 'src/app/modelos/sucursal.modelo';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import { SucursalService } from 'src/app/servicios/sucursal.service';

@Component({
  selector: 'app-consultar-sucursal',
  templateUrl: './consultar-sucursal.component.html',
  styleUrls: ['./consultar-sucursal.component.css']
})
export class ConsultarSucursalComponent {

  listadoSucursales: ModeloSucursal[] = [];
  esAdmin: boolean = false;
  esAsesor: boolean = false;

  constructor(private sucursalServicio: SucursalService,
    private servicioSeguridad: SeguridadService) {}

  ngOnInit(): void {
    let datos = this.servicioSeguridad.ObtenerInformacionSesion();
      this.esAdmin = false;
      this.esAsesor = false;
      if(datos.rolActivo == 'Admin'){
        this.esAdmin = true;
      }
      if(datos.rolActivo == 'Asesor'){
        this.esAsesor = true;
      }

    this.ObtenerListadoSucursales();
  }

  ObtenerListadoSucursales(){
    this.sucursalServicio.ObtenerSucursales().subscribe((datos: ModeloSucursal[]) =>{
      this.listadoSucursales = datos;
    })
  }
}

