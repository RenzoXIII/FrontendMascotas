import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloProspecto } from 'src/app/modelos/prospecto.modelo';
import { ProspectoService } from 'src/app/servicios/prospecto.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  fgValidador: FormGroup = this.fb.group({
    'correo': ['', [Validators.required, Validators.email]],
    'nombre': ['', [Validators.required]],
    'apellidos': ['', [Validators.required]],
    'celular': ['', [Validators.required]],
    'mensaje': ['', [Validators.required]]
    });

  constructor(private fb: FormBuilder,
    private servicioProspecto: ProspectoService,
    private router: Router) {}

  ngOnInit(): void {

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