import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloProducto } from 'src/app/modelos/producto.modelo';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent {

  fgValidador: FormGroup = this.fb.group({
    'nombre': ['', [Validators.required]],
    'precio': ['', [Validators.required]],
    'tipo': ['', [Validators.required]],
    'descripcion': ['', [Validators.required]]
  })

  constructor(private fb: FormBuilder,
    private servicioProducto: ProductoService,
    private router: Router) {}

  GuardarProducto(){
    let nombre = this.fgValidador.controls["nombre"].value;
    let precio = parseInt(this.fgValidador.controls["precio"].value);
    let tipo = this.fgValidador.controls["tipo"].value;
    let descripcion = this.fgValidador.controls["descripcion"].value;
    
    let p = new ModeloProducto();
    p.nombre = nombre;
    p.precio = precio;
    p.tipo = tipo;
    p.descripcion = descripcion;

    this.servicioProducto.CrearProducto(p).subscribe((datos: ModeloProducto) => {
      //alert("Producto almacenado correctamente")
      this.router.navigate(["/admin/consultar-producto"])
    }, (error: any) => {
      alert("Error: Intentalo nuevamente")
    })
  }
}
