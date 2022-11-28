import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
const cryptoJS =  require('crypto-js');

@Component({
  selector: 'app-identificacion',
  templateUrl: './identificacion.component.html',
  styleUrls: ['./identificacion.component.css']
})
export class IdentificacionComponent implements OnInit {

  fgValidador: FormGroup = this.fb.group({
    'usuario': ['', [Validators.required, Validators.email]],
    'contrasena': ['', [Validators.required]]
  });
  constructor(private fb: FormBuilder,
    private servicioSeguridad: SeguridadService,
    private router: Router) {}

  ngOnInit(): void {

  }

  // convenience getter for easy access to form fields
  //get f() { return this.fgValidador.controls; }

  IdentificarUsuario(){
    let usuario = this.fgValidador.controls["usuario"].value;
    let contrasena = this.fgValidador.controls["contrasena"].value;
    let contrasenaCifrada = cryptoJS.MD5(contrasena).toString();
    this.servicioSeguridad.Identificar(usuario, contrasenaCifrada).subscribe((datos:any) => {
      //OK
      this.servicioSeguridad.AlmacenarSesion(datos);
      this.router.navigate(['/inicio']);
    },(error:any) => {
      //Fail
      alert("Datos invalidos: Intentalo nuevamente.")
    })
  }

}
