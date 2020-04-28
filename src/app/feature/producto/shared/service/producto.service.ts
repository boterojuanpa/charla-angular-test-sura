import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { Producto } from '../model/producto';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(protected http: HttpService) { }

  public consultar() {
    return this.http.doGet<Producto[]>(`${environment.endpoint}/productos`)
      .pipe(map((productos: Producto[]) =>
      productos.filter(producto => producto.precio > 5000))
     );
  }

  public guardar(producto: Producto) {
    if(producto.canastaBasica && producto.precio > 25000){
      throw new Error("No se puede guardar productos que hagan parte de la canasta y cuesten mas de 25000");
    }
    producto.calcularIva();
    return this.http.doPost<Producto, boolean>(`${environment.endpoint}/productos`, producto);
  }

  public eliminar(producto: Producto) {
    return this.http.doDelete<Producto, boolean>(`${environment.endpoint}/productos/${producto.id}`);
  }
  
}
