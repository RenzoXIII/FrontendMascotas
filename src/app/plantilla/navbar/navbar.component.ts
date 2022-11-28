import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModeloIdentificar } from 'src/app/modelos/identificar.modelo';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  seInicioSesion: boolean = false;
  esAdmin: boolean = false;
  esAsesor: boolean = false;
  correo: String = '';
  rol: String = 'Anónimo';
  id: String = '';

  subs: Subscription = new Subscription();

  constructor(private seguridadServicio: SeguridadService){}

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
}
