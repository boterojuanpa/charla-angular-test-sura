import { Component, OnInit } from '@angular/core';

import { ProductoService } from '@producto/shared/service/producto.service';
import { Observable } from 'rxjs';
import { Producto } from '@producto/shared/model/producto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.component.html',
  styleUrls: ['./listar-producto.component.scss']
})
export class ListarProductoComponent implements OnInit {
  public listaProductos: Observable<Producto[]>;

  constructor(protected productoService: ProductoService, protected router: Router) { }

  ngOnInit() {
    this.listaProductos = this.productoService.consultar();
  }

  modificar(producto: Producto){
    let url = `/producto/crear/${producto.id}`;
    this.router.navigateByUrl(url);

  }

}
