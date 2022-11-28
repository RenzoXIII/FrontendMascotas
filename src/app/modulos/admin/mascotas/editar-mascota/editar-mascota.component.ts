import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloMascota } from 'src/app/modelos/mascota.modelo';
import { ModeloPlan } from 'src/app/modelos/plan.modelo';
import { ModeloUsuario } from 'src/app/modelos/usuario.model';
import { MascotaService } from 'src/app/servicios/mascota.service';
import { PlanService } from 'src/app/servicios/plan.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-editar-mascota',
  templateUrl: './editar-mascota.component.html',
  styleUrls: ['./editar-mascota.component.css']
})
export class EditarMascotaComponent {

  id: string = '';
  listadoUsuarios: ModeloUsuario[] = [];
  listadoPlanes: ModeloPlan[] = [];

  fgValidador: FormGroup = this.fb.group({
    'id': ['', [Validators.required]],
    'nombre': ['', [Validators.required]],
    'foto': ['', [Validators.required]],
    'estado': ['', [Validators.required]],
    'especie': ['', [Validators.required]],
    'comentario': ['', [Validators.required]],

    'usuario': ['', [Validators.required]],
    'plan': ['', [Validators.required]]
  })

  constructor(private fb: FormBuilder,
    private servicioMascota: MascotaService,
    private usuarioServicio: UsuarioService,
    private planServicio: PlanService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.BuscarMascota();

    this.ObtenerListadoUsuarios();
    this.ObtenerListadoPlanes();
  }

  ObtenerListadoUsuarios(){
    this.usuarioServicio.ObtenerUsuarios().subscribe((datos: ModeloUsuario[]) =>{
      this.listadoUsuarios = datos;
    })
  }

  ObtenerListadoPlanes(){
    this.planServicio.ObtenerPlanes().subscribe((datos: ModeloPlan[]) =>{
      this.listadoPlanes = datos;
    })
  }

  BuscarMascota(){
    this.servicioMascota.ObtenerMascotasPorId(this.id).subscribe((datos: ModeloMascota) => {
      this.fgValidador.controls["id"].setValue(datos.id);
      this.fgValidador.controls["nombre"].setValue(datos.nombre);
      this.fgValidador.controls["foto"].setValue('   ');
      this.fgValidador.controls["estado"].setValue(datos.estado);
      this.fgValidador.controls["especie"].setValue(datos.especie);
      this.fgValidador.controls["comentario"].setValue(datos.comentario);
      this.fgValidador.controls["usuario"].setValue(datos.usuarioId);
      this.fgValidador.controls["plan"].setValue(datos.planId);
    });
  }

  EditarMascota(){
    let nombre = this.fgValidador.controls["nombre"].value;
    let foto = this.fgValidador.controls["foto"].value;
    let estado = this.fgValidador.controls["estado"].value;
    let especie = this.fgValidador.controls["especie"].value;
    let comentario = this.fgValidador.controls["comentario"].value;
    let usuario = this.fgValidador.controls["usuario"].value;
    let plan = this.fgValidador.controls["plan"].value;
    
    let p = new ModeloMascota();
    p.id = this.id;
    p.nombre = nombre;
    p.foto = foto;
    p.estado = estado;
    p.especie = especie;
    p.comentario = comentario;
    p.usuarioId = usuario;
    p.planId = plan;

    this.servicioMascota.EditarMascota(p).subscribe((datos: ModeloMascota) => {
      //alert("Producto actualizado correctamente")
      this.router.navigate(["/admin/consultar-mascota"])
    }, (error: any) => {
      alert("Error: Intentalo nuevamente")
    })
  }
}
