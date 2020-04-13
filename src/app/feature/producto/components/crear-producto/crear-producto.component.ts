import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../shared/service/producto.service';
import { Producto } from '../../shared/model/producto';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss']
})
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;
  constructor(protected productoServices: ProductoService) { }

  ngOnInit() {
    this.construirFormularioProducto();
  }

  crear() {

    const productoFormValue: Producto = this.productoForm.value as Producto;

    this.productoServices.guardar(new Producto(productoFormValue.id, productoFormValue.descripcion, productoFormValue.precio, productoFormValue.aplicaIva, productoFormValue.canastaBasica)).subscribe((data) => {
      alert("producto creado")
    }, (error) => {
      alert("error " + error)
    });
  }

  private construirFormularioProducto() {
    this.productoForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      precio: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      aplicaIva: new FormControl(true),
      canastaBasica: new FormControl(false)
    });
  }

}
