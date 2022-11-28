import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloUsuario } from 'src/app/modelos/usuario.model';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-recuperar-clave',
  templateUrl: './recuperar-clave.component.html',
  styleUrls: ['./recuperar-clave.component.css']
})
export class RecuperarClaveComponent {

  id: string = '';

  fgValidador: FormGroup = this.fb.group({
    'correo': ['', [Validators.required, Validators.email]]
  })

  constructor(private fb: FormBuilder,
    private servicioUsuario: UsuarioService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {

  }

  RecuperarContrasena(){
    let correo = this.fgValidador.controls["correo"].value;

    this.servicioUsuario.ObtenerUsuariosPorCorreo(correo).subscribe((datos: ModeloUsuario[]) => {

      if(!!datos[0]){
        let p = datos[0];

        this.servicioUsuario.RecuperarContrasenaUsuario(p).subscribe((datos: ModeloUsuario) => {
          this.router.navigate(["/seguridad/identificacion"])
        }, (error: any) => {
          alert("Error: Intentalo nuevamente.")
        })
      }else{
        alert("Error: Intentalo nuevamente.")
      }

    }, (error: any) => {
      alert("Error: Intentalo nuevamente.")
    })

  }
}

