import { Component } from '@angular/core';
import { ModeloPlan } from 'src/app/modelos/plan.modelo';
import { PlanService } from 'src/app/servicios/plan.service';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-consultar-plan',
  templateUrl: './consultar-plan.component.html',
  styleUrls: ['./consultar-plan.component.css']
})
export class ConsultarPlanComponent {


  listadoPlanes: ModeloPlan[] = [];
  esAdmin: boolean = false;
  esAsesor: boolean = false;

  constructor(private planServicio: PlanService,
    private servicioSeguridad: SeguridadService
    ) {}

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

    this.ObtenerListadoPlanes();
  }

  ObtenerListadoPlanes(){
    this.planServicio.ObtenerPlanes().subscribe((datos: ModeloPlan[]) =>{
      this.listadoPlanes = datos;
    })
  }
}
