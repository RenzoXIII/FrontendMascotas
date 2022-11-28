import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloPlan } from 'src/app/modelos/plan.modelo';
import { PlanService } from 'src/app/servicios/plan.service';

@Component({
  selector: 'app-crear-plan',
  templateUrl: './crear-plan.component.html',
  styleUrls: ['./crear-plan.component.css']
})
export class CrearPlanComponent {

  fgValidador: FormGroup = this.fb.group({
    'nombre': ['', [Validators.required]],
    'precio': ['', [Validators.required]],
    'descripcion': ['', [Validators.required]]
  })

  constructor(private fb: FormBuilder,
    private servicioPlan: PlanService,
    private router: Router) {}

  GuardarPlan(){
    let nombre = this.fgValidador.controls["nombre"].value;
    let precio = parseInt(this.fgValidador.controls["precio"].value);
    let descripcion = this.fgValidador.controls["descripcion"].value;
    
    let p = new ModeloPlan();
    p.nombre = nombre;
    p.precio = precio;
    p.descripcion = descripcion;

    this.servicioPlan.CrearPlan(p).subscribe((datos: ModeloPlan) => {
      //alert("Plan almacenado correctamente")
      this.router.navigate(["/admin/consultar-plan"])
    }, (error: any) => {
      alert("Error: Intentalo nuevamente")
    })
  }
}

