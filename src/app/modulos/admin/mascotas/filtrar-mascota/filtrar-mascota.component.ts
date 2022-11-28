import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloMascota } from 'src/app/modelos/mascota.modelo';
import { ModeloUsuario } from 'src/app/modelos/usuario.model';
import { MascotaService } from 'src/app/servicios/mascota.service';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-filtrar-mascota',
  templateUrl: './filtrar-mascota.component.html',
  styleUrls: ['./filtrar-mascota.component.css']
})
export class FiltrarMascotaComponent {

  listadoMascotas: ModeloMascota[] = [];
  esAdmin: boolean = false;
  esAsesor: boolean = false;
  id: String = '';
  dueno: ModeloUsuario = new ModeloUsuario;

  constructor(private mascotaServicio: MascotaService,
    private usuarioServicio: UsuarioService,
    private servicioSeguridad: SeguridadService,
    private servicioUsuario: UsuarioService,
    private router: Router,
    private route: ActivatedRoute) {}

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
    
    this.id = this.route.snapshot.params["id"];
    this.BuscarUsuario();
    this.ObtenerMisMascotas();
    
  }

  BuscarUsuario(){
    this.servicioUsuario.ObtenerUsuariosPorId(this.id).subscribe((datos: ModeloUsuario) => {
      this.dueno = datos;
    });
  }

  ObtenerMisMascotas(){
    this.mascotaServicio.ObtenerMascotas().subscribe((datos: ModeloMascota[]) =>{
      datos = datos.filter(mascota => mascota.usuarioId == this.id)
      this.listadoMascotas = datos;
    })
  }
}


