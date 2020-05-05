import { TestBed, ComponentFixture } from "@angular/core/testing"
import { ListarProductoComponent } from './listar-producto.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductoService } from '@producto/shared/service/producto.service';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Producto } from '@producto/shared/model/producto';
import { By } from '@angular/platform-browser';
import { DetalleProductoComponent } from '../detalle-producto/detalle-producto.component';
import { Router } from '@angular/router';

describe("Pruebas al componente listar producto", () => {

    let fixture: ComponentFixture<ListarProductoComponent>;
    let component: ListarProductoComponent;

    let routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ListarProductoComponent, DetalleProductoComponent],
            imports: [HttpClientTestingModule],
            providers: [ProductoService, HttpService,
                {
                    provide: Router, useValue: routerSpy
                }
            ]
        });

        fixture = TestBed.createComponent(ListarProductoComponent);
        component = fixture.componentInstance;
    })

    it("Al abrir el componente debería consultar los productos y listarlos", () => {

        const productosARetornar = [new Producto("1", "Carne", 5500, true, true), new Producto("1", "arroz", 2500, true, true)];

        fixture.detectChanges();

        const httpTestingCotnroller = TestBed.inject(HttpTestingController);
        const request = httpTestingCotnroller.expectOne(`${environment.endpoint}/productos`);

        expect(request.request.method).toEqual("GET");

        request.flush(productosARetornar);

        fixture.detectChanges();

        let filas = fixture.debugElement.queryAll(By.css("li"));

        expect(filas.length).toBe(1);
        expect(filas[0].nativeElement.textContent).toBe("1 Carne - 5500Modificar")

    })

    it("cuando da click en modificar debería llamar al componente crear con el id del producto", () => {

        const productosARetornar = [new Producto("1", "Carne", 5500, true, true), new Producto("1", "arroz", 2500, true, true)];

        fixture.detectChanges();

        const httpTestingCotnroller = TestBed.inject(HttpTestingController);
        const request = httpTestingCotnroller.expectOne(`${environment.endpoint}/productos`);

        expect(request.request.method).toEqual("GET");

        request.flush(productosARetornar);

        fixture.detectChanges();

        let boton = fixture.nativeElement.querySelector("button");

        boton.click();

        const urlEjecutada = routerSpy.navigateByUrl.calls.first().args[0];

        expect(urlEjecutada).toBe("/producto/crear/1");



    })



})