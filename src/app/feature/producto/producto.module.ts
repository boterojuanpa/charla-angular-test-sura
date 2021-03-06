import { NgModule } from '@angular/core';

import { ProductoRoutingModule } from './producto-routing.module';
import { ListarProductoComponent } from './components/listar-producto/listar-producto.component';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { ProductoComponent } from './components/producto/producto.component';
import { SharedModule } from '@shared/shared.module';
import { DetalleProductoComponent } from './components/detalle-producto/detalle-producto.component';


@NgModule({
  declarations: [
    CrearProductoComponent,
    ListarProductoComponent,
    ProductoComponent,
    DetalleProductoComponent
  ],
  imports: [
    ProductoRoutingModule,
    SharedModule
  ]
  
})
export class ProductoModule { }
