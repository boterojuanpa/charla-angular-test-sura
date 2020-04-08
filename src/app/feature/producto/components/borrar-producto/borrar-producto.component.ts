import { Component, OnInit } from '@angular/core';
import { ProductoService } from '@producto/shared/service/producto.service';
import { Producto } from '@producto/shared/model/producto';

@Component({
  selector: 'app-borrar-producto',
  templateUrl: './borrar-producto.component.html',
  styleUrls: ['./borrar-producto.component.scss']
})
export class BorrarProductoComponent implements OnInit {


  constructor() { }

  ngOnInit() {
  }

}
