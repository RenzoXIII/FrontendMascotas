import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloPlan } from 'src/app/modelos/plan.modelo';
import { PlanService } from 'src/app/servicios/plan.service';

@Component({
  selector: 'app-editar-plan',
  templateUrl: './editar-plan.component.html',
  styleUrls: ['./editar-plan.component.css']
})
export class EditarPlanComponent {

  id: string = '';

  fgValidador: FormGroup = this.fb.group({
    'id': ['', [Validators.required]],
    'nombre': ['', [Validators.required]],
    'precio': ['', [Validators.required]],
    'descripcion': ['', [Validators.required]]
  })

  constructor(private fb: FormBuilder,
    private servicioPlan: PlanService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.BuscarPlan();
  }

  BuscarPlan(){
    this.servicioPlan.ObtenerPlanesPorId(this.id).subscribe((datos: ModeloPlan) => {
      this.fgValidador.controls["id"].setValue(datos.id);
      this.fgValidador.controls["nombre"].setValue(datos.nombre);
      this.fgValidador.controls["precio"].setValue(datos.precio);
      this.fgValidador.controls["descripcion"].setValue(datos.descripcion);

    });
  }

  EditarPlan(){
    let nombre = this.fgValidador.controls["nombre"].value;
    let precio = parseInt(this.fgValidador.controls["precio"].value);
    let descripcion = this.fgValidador.controls["descripcion"].value;
    
    let p = new ModeloPlan();
    p.id = this.id;
    p.nombre = nombre;
    p.precio = precio;
    p.descripcion = descripcion;

    this.servicioPlan.EditarPlan(p).subscribe((datos: ModeloPlan) => {
      //alert("Producto actualizado correctamente")
      this.router.navigate(["/admin/consultar-plan"])
    }, (error: any) => {
      alert("Error: Intentalo nuevamente")
    })
  }
}

