import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloUsuario } from 'src/app/modelos/usuario.model';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})

export class EditarUsuarioComponent {

  id: string = '';
  contrasena: string = ''; 
  esAdmin: boolean = false;
  esAsesor: boolean = false;

  fgValidador: FormGroup = this.fb.group({
    'id': ['', [Validators.required]],
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
  }


  BuscarUsuario(){
    this.servicioUsuario.ObtenerUsuariosPorId(this.id).subscribe((datos: ModeloUsuario) => {
      this.fgValidador.controls["id"].setValue(datos.id);
      this.fgValidador.controls["cedula"].setValue(datos.cedula);
      this.fgValidador.controls["nombre"].setValue(datos.nombre);
      this.fgValidador.controls["apellidos"].setValue(datos.apellidos);
      this.fgValidador.controls["telefono"].setValue(datos.telefono);
      this.fgValidador.controls["correo"].setValue(datos.correo);
      this.fgValidador.controls["rol"].setValue(datos.rol);
    });
  }

  EditarUsuario(){
    let cedula = this.fgValidador.controls["cedula"].value;
    let nombre = this.fgValidador.controls["nombre"].value;
    let apellidos = this.fgValidador.controls["apellidos"].value;
    let telefono = this.fgValidador.controls["telefono"].value;
    let correo = this.fgValidador.controls["correo"].value;
    let rol = this.fgValidador.controls["rol"].value;
    
    let p = new ModeloUsuario();
    p.id = this.id;
    p.cedula = cedula;
    p.nombre = nombre;
    p.apellidos = apellidos;
    p.telefono = telefono;
    p.correo = correo;
    p.rol = rol;

    this.servicioUsuario.EditarUsuario(p).subscribe((datos: ModeloUsuario) => {
      //alert("Producto actualizado correctamente")
      this.router.navigate(["/admin/consultar-usuario"])
    }, (error: any) => {
      alert("Error: Intentalo nuevamente")
    })
  }
}
