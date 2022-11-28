import { Component } from '@angular/core';
import { ModeloMascota } from 'src/app/modelos/mascota.modelo';
import { ModeloUsuario } from 'src/app/modelos/usuario.model';
import { MascotaService } from 'src/app/servicios/mascota.service';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-consultar-mascota',
  templateUrl: './consultar-mascota.component.html',
  styleUrls: ['./consultar-mascota.component.css']
})
export class ConsultarMascotaComponent {

  listadoMascotas: ModeloMascota[] = [];
  esAdmin: boolean = false;
  esAsesor: boolean = false;
  id: String = '';

  constructor(private mascotaServicio: MascotaService,
    private usuarioServicio: UsuarioService,
    private servicioSeguridad: SeguridadService) {}

  ngOnInit(): void {
    let datos = this.servicioSeguridad.ObtenerInformacionSesion();
    this.esAdmin = false;
    this.esAsesor = false;
    this.id = '';

    if(!!datos.datos?.id){
      this.id = datos.datos?.id;
    }
    if(datos.rolActivo == 'Admin'){
      this.esAdmin = true;
      this.ObtenerListadoMascotas();
    }
    if(datos.rolActivo == 'Asesor'){
      this.esAsesor = true;
      this.ObtenerListadoMascotas();
    }
    if(datos.rolActivo != 'Admin' && datos.rolActivo != 'Asesor'){
      this.ObtenerMisMascotas();
    }

    
  }

  ObtenerListadoMascotas(){
    this.mascotaServicio.ObtenerMascotas().subscribe((datos: ModeloMascota[]) =>{
      this.listadoMascotas = datos;
    })
  }

  ObtenerMisMascotas(){
    this.mascotaServicio.ObtenerMascotas().subscribe((datos: ModeloMascota[]) =>{
      datos = datos.filter(mascota => mascota.usuarioId == this.id)
      this.listadoMascotas = datos;
    })
  }
}

