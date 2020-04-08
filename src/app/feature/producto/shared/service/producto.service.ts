import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { Producto } from '../model/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(protected http: HttpService) {}

  public consultar() {
    return this.http.doGet<Producto[]>(`${environment.endpoint}/productos`);
  }

  public guardar(producto: Producto) {
    return this.http.doPost<Producto, boolean>(`${environment.endpoint}/productos`, producto);
  }

  public eliminar(producto: Producto) {
    return this.http.doDelte<Producto, boolean>(`${environment.endpoint}/productos/${producto.id}`);
  }
}