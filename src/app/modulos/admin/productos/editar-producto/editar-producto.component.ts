import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloProducto } from 'src/app/modelos/producto.modelo';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent {

  id: string = '';

  fgValidador: FormGroup = this.fb.group({
    'id': ['', [Validators.required]],
    'nombre': ['', [Validators.required]],
    'precio': ['', [Validators.required]],
    'tipo': ['', [Validators.required]],
    'descripcion': ['', [Validators.required]]
  })

  constructor(private fb: FormBuilder,
    private servicioProducto: ProductoService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.BuscarProducto();
  }

  BuscarProducto(){
    this.servicioProducto.ObtenerProductosPorId(this.id).subscribe((datos: ModeloProducto) => {
      this.fgValidador.controls["id"].setValue(datos.id);
      this.fgValidador.controls["nombre"].setValue(datos.nombre);
      this.fgValidador.controls["precio"].setValue(datos.precio);
      this.fgValidador.controls["tipo"].setValue(datos.tipo);
      this.fgValidador.controls["descripcion"].setValue(datos.descripcion);

    });
  }

  EditarProducto(){
    let nombre = this.fgValidador.controls["nombre"].value;
    let precio = parseInt(this.fgValidador.controls["precio"].value);
    let tipo = this.fgValidador.controls["tipo"].value;
    let descripcion = this.fgValidador.controls["descripcion"].value;
    
    let p = new ModeloProducto();
    p.id = this.id;
    p.nombre = nombre;
    p.precio = precio;
    p.tipo = tipo;
    p.descripcion = descripcion;

    this.servicioProducto.EditarProducto(p).subscribe((datos: ModeloProducto) => {
      //alert("Producto actualizado correctamente")
      this.router.navigate(["/admin/consultar-producto"])
    }, (error: any) => {
      alert("Error: Intentalo nuevamente")
    })
  }
}
