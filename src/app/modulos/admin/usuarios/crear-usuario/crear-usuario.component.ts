import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloUsuario } from 'src/app/modelos/usuario.model';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})

export class CrearUsuarioComponent {

  esAdmin: boolean = false;
  esAsesor: boolean = false;

  fgValidador: FormGroup = this.fb.group({
    'cedula': ['', [Validators.required]],
    'nombre': ['', [Validators.required]],
    'apellidos': ['', [Validators.required]],
    'telefono': ['', [Validators.required]],
    'correo': ['', [Validators.required]],
    'rol': ['', [Validators.required]]
  })

  constructor(private fb: FormBuilder,
    private servicioSeguridad: SeguridadService,
    private servicioUsuario: UsuarioService,
    private router: Router) {}

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
      
    }

  GuardarUsuario(){
    let cedula = this.fgValidador.controls["cedula"].value;
    let nombre = this.fgValidador.controls["nombre"].value;
    let apellidos = this.fgValidador.controls["apellidos"].value;
    let telefono = this.fgValidador.controls["telefono"].value;
    let correo = this.fgValidador.controls["correo"].value;
    let rol = this.fgValidador.controls["rol"].value;
    
    let p = new ModeloUsuario();
    p.cedula = cedula;
    p.nombre = nombre;
    p.apellidos = apellidos;
    p.telefono = telefono;
    p.correo = correo;
    p.rol = rol;

    this.servicioUsuario.CrearUsuario(p).subscribe((datos: ModeloUsuario) => {
      this.router.navigate(["/admin/consultar-usuario"])
    }, (error: any) => {
      alert("Error: Intentalo nuevamente")
    })
  }
}
