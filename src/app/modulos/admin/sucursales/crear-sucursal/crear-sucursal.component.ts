import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloPlan } from 'src/app/modelos/plan.modelo';
import { ModeloSucursal } from 'src/app/modelos/sucursal.modelo';
import { PlanService } from 'src/app/servicios/plan.service';
import { SucursalService } from 'src/app/servicios/sucursal.service';

@Component({
  selector: 'app-crear-sucursal',
  templateUrl: './crear-sucursal.component.html',
  styleUrls: ['./crear-sucursal.component.css']
})
export class CrearSucursalComponent {

  fgValidador: FormGroup = this.fb.group({
    'departamento': ['', [Validators.required]],
    'ciudad': ['', [Validators.required]],
    'direccion': ['', [Validators.required]],
    'telefono': ['', [Validators.required]]
  })

  constructor(private fb: FormBuilder,
    private servicioSucursal: SucursalService,
    private router: Router) {}

  GuardarSucursal(){
    let departamento = this.fgValidador.controls["departamento"].value;
    let ciudad = this.fgValidador.controls["ciudad"].value;
    let direccion = this.fgValidador.controls["direccion"].value;
    let telefono = this.fgValidador.controls["telefono"].value;
    
    let p = new ModeloSucursal();
    p.departamento = departamento;
    p.ciudad = ciudad;
    p.direccion = direccion;
    p.telefono = telefono;

    this.servicioSucursal.CrearSucursal(p).subscribe((datos: ModeloSucursal) => {
      //alert("Sucursal almacenado correctamente")
      this.router.navigate(["/admin/consultar-sucursal"])
    }, (error: any) => {
      alert("Error: Intentalo nuevamente")
    })
  }
}

