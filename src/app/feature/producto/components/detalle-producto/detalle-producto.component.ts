import { Component, OnInit, Input } from '@angular/core';
import { Producto } from '@producto/shared/model/producto';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.scss']
})
export class DetalleProductoComponent implements OnInit {


  @Input()
  public producto : Producto;

  constructor() { }

  ngOnInit(): void {
  }

}
