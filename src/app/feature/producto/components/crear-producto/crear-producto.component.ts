import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../shared/service/producto.service';
import { Producto } from '../../shared/model/producto';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

const PRECIO_MAXIMO_CANASTA = 25000;
@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss']
})
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;

  public mensajeError =  "El precio del producto debe ser menor a 25000" ;

  constructor(protected productoServices: ProductoService, protected route: ActivatedRoute) { }

  ngOnInit() {
    this.construirFormularioProducto();
    this.route.paramMap.subscribe((param)=>{
      this.productoForm.controls.id.setValue(param.get('id'));
    })
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
  public esCanastaYPrecioEsMayorAPermitido(){
    return this.productoForm.get('canastaBasica').value && this.productoForm.get('precio').value > PRECIO_MAXIMO_CANASTA;
  }

}
