import { ProductoService } from "./producto.service"
import { Options, HttpService } from '@core/services/http.service';
import { Producto } from '../model/producto';
import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';

import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

describe("Pruebas servicio de productos", () => {

    it("Consultar productos solo debería retonar productos con precio mayor a 5000, con mock manual", (done: DoneFn) => {

        let productosARetornar = [
            new Producto("1", "Producto 1", 5001, true, true),
            new Producto("2", "Producto 1", 4999, true, true),
        ];
        let httpServiceMock = { doGet: (serviceUrl: string, opts?: Options) => of(productosARetornar) };
        let productoService = new ProductoService(httpServiceMock as HttpService);

        productoService.consultar().subscribe((data) => {
            expect(data.length).toBe(1);
            expect(data[0].descripcion).toBe("Producto 1");
            expect(data[0].id).toBe("1");
            done();
        })
    })

    it("Consultar productos solo debería retonar productos con precio mayor a 5000, con mock jasmine", (done: DoneFn) => {

        let productosARetornar = [
            new Producto("1", "Producto 1", 5001, true, true),
            new Producto("2", "Producto 1", 4999, true, true),
        ];
        let httpServiceMock = jasmine.createSpyObj("httpService", ['doGet']);

        httpServiceMock.doGet.and.returnValue(of(productosARetornar));


        let productoService = new ProductoService(httpServiceMock as HttpService);

        productoService.consultar().subscribe((data) => {
            expect(data.length).toBe(1);
            expect(data[0].descripcion).toBe("Producto 1");
            expect(data[0].id).toBe("1");
            done();
        })
    })

    it("Deberia lanzar excepcionar guardar productos de la canasta y que cuesten mas de 25000", () => {

        let httpServiceMock = jasmine.createSpyObj("httpService", ['doPost']);
        httpServiceMock.doPost.and.returnValue(of(""));
        let productoService = new ProductoService(httpServiceMock as HttpService);

        expect(() => productoService.guardar(new Producto("1", "Carne", 25001, true, true)))
            .toThrowError("No se puede guardar productos que hagan parte de la canasta y cuesten mas de 25000");

        expect(httpServiceMock.doPost.calls.count()).toBe(0);
        expect(httpServiceMock.doPost).not.toHaveBeenCalled();
    })

    it("El metodo guardar debería llamar al servicio POST y calcular iva",(done:DoneFn)=>{

        let httpServiceMock = jasmine.createSpyObj("httpService", ['doPost']);
        httpServiceMock.doPost.and.returnValue(of(""));
        let productoService = new ProductoService(httpServiceMock as HttpService);

        productoService.guardar(new Producto("1", "Carne", 6000, true, true)).subscribe((data)=>{

            expect(httpServiceMock.doPost).toHaveBeenCalled();
            expect(httpServiceMock.doPost.calls.count()).toBe(1);

            expect(httpServiceMock.doPost.calls.argsFor(0)[0]).toBe('http://localhost:3000/productos')
            expect(httpServiceMock.doPost.calls.argsFor(0)[1].id).toBe('1')

            expect(httpServiceMock.doPost.calls.argsFor(0)[1].valorIva).toBe(300);
            done();

        })
    })

    
    describe("Pruebas al servicio de productos con TEstBed", ()=>{

        let httpServiceMock = jasmine.createSpyObj("httpService", ['doPost']);
        let productoService : ProductoService;
        beforeEach(()=>{
            TestBed.configureTestingModule({
                providers: [ProductoService,
                    {
                        provide: HttpService, useValue: httpServiceMock
                    }
                ]
            });
            productoService = TestBed.inject(ProductoService);
        })

        it("El metodo guardar debería llamar al servicio POST y calcular iva con testbed",(done:DoneFn)=>{

            httpServiceMock.doPost.and.returnValue(of(""));
            
            productoService.guardar(new Producto("1", "Carne", 6000, true, true)).subscribe((data)=>{

                expect(httpServiceMock.doPost).toHaveBeenCalled();
                expect(httpServiceMock.doPost.calls.count()).toBe(1);
    
                expect(httpServiceMock.doPost.calls.argsFor(0)[0]).toBe('http://localhost:3000/productos')
                expect(httpServiceMock.doPost.calls.argsFor(0)[1].id).toBe('1')
    
                expect(httpServiceMock.doPost.calls.argsFor(0)[1].valorIva).toBe(300);
                done();
    
            })
        })

    })


    describe("pruebas al servicio productos con Testbed y HttpClientTestingModule",()=>{


        let productoService : ProductoService;
        let httpTestingController: HttpTestingController;

        beforeEach(()=>{
            TestBed.configureTestingModule({
                imports:[HttpClientTestingModule],
                providers: [ProductoService, HttpService]
            });
            productoService = TestBed.inject(ProductoService);
            httpTestingController = TestBed.inject(HttpTestingController);
        })

        it("El metodo guardar debería llamar al servicio POST y calcular iva con testbed",(done:DoneFn)=>{

           
            productoService.guardar(new Producto("1", "Carne", 6000, true, true)).subscribe((data)=>{
                done();    
            })

            let request = httpTestingController.expectOne(`${environment.endpoint}/productos`);
            expect(request.request.method).toEqual('POST');
            expect(request.request.body.id).toEqual('1');
            expect(request.request.body.valorIva).toEqual(300);

            request.flush("");


        })



    })








})