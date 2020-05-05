import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CrearProductoComponent } from './crear-producto.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductoService } from '@producto/shared/service/producto.service';
import { HttpService } from '@core/services/http.service';
import { SharedModule } from '@shared/shared.module';
import { ActivatedRouteStub } from './active-route-stub';
import { ActivatedRoute } from '@angular/router';

fdescribe("Pruebas componente crear producto", ()=>{

    let  fixture : ComponentFixture<CrearProductoComponent>;
    let component: CrearProductoComponent;

    let routerStub = new ActivatedRouteStub();

    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, ReactiveFormsModule, SharedModule],
            declarations: [CrearProductoComponent] ,
            providers: [ProductoService, HttpService, 
            {
                provide: ActivatedRoute, useValue: routerStub
            }]
        })


        fixture = TestBed.createComponent(CrearProductoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    })

    it("cuadno se carga la pagina con un parametro el input id debería mostrar ese parametro",()=>{

        routerStub.setParamMap({id:"30"});

        let inputID : HTMLInputElement = fixture.nativeElement.querySelector("#idProducto");
        expect(inputID.value).toBe("30");

    })

})