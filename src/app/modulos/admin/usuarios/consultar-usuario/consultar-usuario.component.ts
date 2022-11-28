import { Component } from '@angular/core';
import { ModeloUsuario } from 'src/app/modelos/usuario.model';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-consultar-usuario',
  templateUrl: './consultar-usuario.component.html',
  styleUrls: ['./consultar-usuario.component.css']
})

export class ConsultarUsuarioComponent {

  listadoUsuarios: ModeloUsuario[] = [];
  esAdmin: boolean = false;
  esAsesor: boolean = false;
  id: String = '';

  constructor(private usuarioServicio: UsuarioService,
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
      this.ObtenerListadoUsuarios();
    }
    if(datos.rolActivo == 'Asesor'){
      this.esAsesor = true;
      this.ObtenerListadoUsuarios();
    }
    if(datos.rolActivo != 'Admin' && datos.rolActivo != 'Asesor'){
      this.ObtenerMiUsuario();
    }
  }

  ObtenerListadoUsuarios(){
    this.usuarioServicio.ObtenerUsuarios().subscribe((datos: ModeloUsuario[]) =>{
      this.listadoUsuarios = datos;
    })
  }

  ObtenerMiUsuario(){
    this.usuarioServicio.ObtenerUsuariosPorId(this.id).subscribe((datos: ModeloUsuario) =>{
      this.listadoUsuarios = [datos];
    })
  }
}

