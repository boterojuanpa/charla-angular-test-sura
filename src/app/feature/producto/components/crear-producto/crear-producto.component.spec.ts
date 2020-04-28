import { TestBed, ComponentFixture } from "@angular/core/testing"
import { CrearProductoComponent } from './crear-producto.component'
import { ProductoService } from '@producto/shared/service/producto.service'
import { HttpService } from '@core/services/http.service'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from '@shared/shared.module'
import { By } from '@angular/platform-browser'

fdescribe("Pruebas componente crear producto", ()=>{

    let  fixture : ComponentFixture<CrearProductoComponent>;
    let component: CrearProductoComponent;

    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, ReactiveFormsModule, SharedModule],
            declarations: [CrearProductoComponent] ,
            providers: [ProductoService, HttpService]
        })

        fixture = TestBed.createComponent(CrearProductoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    })
    it("Cuando se carga la pagina el mensaje de canasta y precio mayor no debería ser visible", ()=>{

        expect(fixture.nativeElement.querySelector("#mensajeCanasta")).toBeNull();        
    })

    it("Si es canasta y precio es mayor que 25000 debería mostar el mensaje de advertencia", ()=>{
        const inputPrecio : HTMLInputElement = fixture.nativeElement.querySelector("#precio");
        const inputCanastaBasica : HTMLInputElement = fixture.nativeElement.querySelector("#canastaBasica");

        inputPrecio.value = "25001";
        inputCanastaBasica.checked = true;

        inputPrecio.dispatchEvent(new Event('input'));
        inputCanastaBasica.dispatchEvent(new Event('change'));

        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector("#mensajeCanasta")).toBeDefined();
        expect(fixture.nativeElement.querySelector("#mensajeCanasta").textContent).toBe(" El precio del producto debe ser menor a 25000 ");

    })

    it("Si es canasta y precio es menor que 25000 no debería mostar el mensaje de advertencia", ()=>{
        const inputPrecio : HTMLInputElement = fixture.nativeElement.querySelector("#precio");
        const inputCanastaBasica : HTMLInputElement = fixture.nativeElement.querySelector("#canastaBasica");

        inputPrecio.value = "24999";
        inputCanastaBasica.checked = true;

        inputPrecio.dispatchEvent(new Event('input'));
        inputCanastaBasica.dispatchEvent(new Event('change'));

        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector("#mensajeCanasta")).toBeNull();

    })

    it("Si no es canasta y precio es mayor que 25000 no debería mostar el mensaje de advertencia", ()=>{
        const inputPrecio : HTMLInputElement = fixture.nativeElement.querySelector("#precio");
        const inputCanastaBasica : HTMLInputElement = fixture.nativeElement.querySelector("#canastaBasica");

        inputPrecio.value = "25001";
        inputCanastaBasica.checked = false;

        inputPrecio.dispatchEvent(new Event('input'));
        inputCanastaBasica.dispatchEvent(new Event('change'));

        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector("#mensajeCanasta")).toBeNull();

    })

    it("Si  es canasta y precio es mayor que 25000  debería mostar el mensaje de advertencia", ()=>{

        component.productoForm.controls.precio.setValue('25001');
        component.productoForm.controls.canastaBasica.setValue(true);

        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector("#mensajeCanasta")).toBeDefined();
        expect(fixture.nativeElement.querySelector("#mensajeCanasta").textContent).toBe(" El precio del producto debe ser menor a 25000 ");

    })

    it("Cuando los campos requeridos estan vacios debería mostrar mensaje de error", ()=>{

        const erroresActivos = fixture.debugElement.queryAll(By.css('.componente-validador'));

        expect(erroresActivos.length).toBe(3);
        expect(erroresActivos[0].nativeElement.textContent).toBe("Dato  obligatorio ");
        expect(erroresActivos[1].nativeElement.textContent).toBe("Dato  obligatorio ");
        expect(erroresActivos[2].nativeElement.textContent).toBe("Dato  obligatorio ");

        component.productoForm.controls.precio.setValue('1');
        fixture.detectChanges();

        expect(erroresActivos[2].nativeElement.textContent).toBe("Mínimo 2 caracteres, actual 1");
    })


})