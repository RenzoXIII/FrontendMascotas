import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModeloIdentificar } from 'src/app/modelos/identificar.modelo';
import { ModeloProspecto } from 'src/app/modelos/prospecto.modelo';
import { ProspectoService } from 'src/app/servicios/prospecto.service';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  seInicioSesion: boolean = false;
  esAdmin: boolean = false;
  esAsesor: boolean = false;
  correo: String = '';
  rol: String = 'Anónimo';
  id: String = '';

  subs: Subscription = new Subscription();

  fgValidador: FormGroup = this.fb.group({
    'correo': ['', [Validators.required, Validators.email]],
    'nombre': ['', [Validators.required]],
    'apellidos': ['', [Validators.required]],
    'celular': ['', [Validators.required]],
    'mensaje': ['', [Validators.required]]
    });

  constructor(private fb: FormBuilder,
    private servicioProspecto: ProspectoService,
    private seguridadServicio: SeguridadService,
    private router: Router) {}

  ngOnInit(): void {
    this.subs = this.seguridadServicio.ObtenerDatosUsuarioEnSesion().subscribe((datos:ModeloIdentificar) => {
      this.seInicioSesion = datos.estaIdentificado;
      if(!!datos.datos?.correo){
        this.correo = datos.datos?.correo;
      }
      this.rol = datos.rolActivo;
      this.id = '';
      if(!!datos.datos?.id){
        this.id = datos.datos?.id;
      }

      this.esAdmin = false;
      this.esAsesor = false;
      if(datos.rolActivo == 'Admin'){
        this.esAdmin = true;
      }
      if(datos.rolActivo == 'Asesor'){
        this.esAsesor = true;
      }
    })
  }

 
  EnviarMensaje(){
    let nombre = this.fgValidador.controls["nombre"].value;
    let apellidos = this.fgValidador.controls["apellidos"].value;
    let correo = this.fgValidador.controls["correo"].value;
    let celular = this.fgValidador.controls["celular"].value;
    let mensaje = this.fgValidador.controls["mensaje"].value;

    let p = new ModeloProspecto();
    p.correo = correo;
    p.nombre = nombre;
    p.celular = celular;
    p.comentario = mensaje;
    p.apellidos = apellidos;

    this.servicioProspecto.EnviarMensaje(p).subscribe((datos: ModeloProspecto) => {
      this.router.navigate(["/admin/crear-cliente"])
    }, (error: any) => {
      alert("Error: Intentalo nuevamente")
    })
  
    
  }

}