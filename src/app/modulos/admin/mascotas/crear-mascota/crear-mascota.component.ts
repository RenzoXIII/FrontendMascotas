import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloMascota } from 'src/app/modelos/mascota.modelo';
import { ModeloPlan } from 'src/app/modelos/plan.modelo';
import { ModeloUsuario } from 'src/app/modelos/usuario.model';
import { MascotaService } from 'src/app/servicios/mascota.service';
import { PlanService } from 'src/app/servicios/plan.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-crear-mascota',
  templateUrl: './crear-mascota.component.html',
  styleUrls: ['./crear-mascota.component.css']
})
export class CrearMascotaComponent {

  fgValidador: FormGroup = this.fb.group({
    'nombre': ['', [Validators.required]],
    'foto': ['', [Validators.required]],
    'estado': ['', [Validators.required]],
    'especie': ['', [Validators.required]],
    'comentario': ['', [Validators.required]],

    'usuario': ['', [Validators.required]],
    //'asesor': ['', [Validators.required]],
    'plan': ['', [Validators.required]]

  })

  listadoUsuarios: ModeloUsuario[] = [];
  listadoAsesores: ModeloUsuario[] = [];
  listadoPlanes: ModeloPlan[] = [];

  constructor(private fb: FormBuilder,
    private servicioMascota: MascotaService,
    private usuarioServicio: UsuarioService,
    private planServicio: PlanService,
    private router: Router) {}

    ngOnInit(): void {
      this.fgValidador.controls["estado"].setValue('Pendiente');
      this.fgValidador.controls["comentario"].setValue('A la espera de evaluación.');
      this.fgValidador.controls["foto"].setValue('  ');

      this.ObtenerListadoUsuarios();
      //this.ObtenerListadoAsesores();
      this.ObtenerListadoPlanes();

    }
  
    ObtenerListadoUsuarios(){
      this.usuarioServicio.ObtenerUsuarios().subscribe((datos: ModeloUsuario[]) =>{
        this.listadoUsuarios = datos;
      })
    }

    //ObtenerListadoAsesores(){
    //  this.usuarioServicio.ObtenerUsuariosPorRol("Asesor").subscribe((datos: ModeloUsuario[]) =>{
    //    this.listadoAsesores = datos;
    //  })
    //}

    ObtenerListadoPlanes(){
      this.planServicio.ObtenerPlanes().subscribe((datos: ModeloPlan[]) =>{
        this.listadoPlanes = datos;
      })
    }

  GuardarMascota(){
    let nombre = this.fgValidador.controls["nombre"].value;
    let foto = this.fgValidador.controls["foto"].value;
    let estado = this.fgValidador.controls["estado"].value;
    let especie = this.fgValidador.controls["especie"].value;
    let comentario = this.fgValidador.controls["comentario"].value;
    let usuario = this.fgValidador.controls["usuario"].value;
    let plan = this.fgValidador.controls["plan"].value;
    
    let p = new ModeloMascota();
    p.nombre = nombre;
    p.foto = foto;
    p.estado = estado;
    p.especie = especie;
    p.comentario = comentario;
    p.usuarioId = usuario;
    p.planId = plan;

    this.servicioMascota.CrearMascota(p).subscribe((datos: ModeloMascota) => {
      this.router.navigate(["/admin/consultar-mascota"])
    }, (error: any) => {
      alert("Error: Intentalo nuevamente")
    })
  }
}
