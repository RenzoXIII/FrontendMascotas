import { Component } from '@angular/core';
import { ModeloProducto } from 'src/app/modelos/producto.modelo';
import { ProductoService } from 'src/app/servicios/producto.service';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-consultar-producto',
  templateUrl: './consultar-producto.component.html',
  styleUrls: ['./consultar-producto.component.css']
})
export class ConsultarProductoComponent {

  listadoProductos: ModeloProducto[] = [];
  esAdmin: boolean = false;
  esAsesor: boolean = false;

  constructor(private productoServicio: ProductoService,
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

    this.ObtenerListadoProductos();
  }

  ObtenerListadoProductos(){
    this.productoServicio.ObtenerProductos().subscribe((datos: ModeloProducto[]) =>{
      this.listadoProductos = datos;
    })
  }
}
