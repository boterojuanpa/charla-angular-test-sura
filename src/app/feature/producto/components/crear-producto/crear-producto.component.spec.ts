import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CrearProductoComponent } from './crear-producto.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductoService } from '../../shared/service/producto.service';
import { HttpService } from 'src/app/core/services/http.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



fdescribe("A spec", function() {
  beforeEach(function() {
    this.foo = 0;
  });

  it("can use the `this` to share state", function() {
    expect(this.foo).toEqual(0);
    this.bar = "test pollution?";
  });

  it("prevents test pollution by having an empty `this` created for the next spec", function() {
    expect(this.foo).toEqual(0);
    expect(this.bar).toBe(undefined);
  });
});


// describe('CrearProductoComponent', () => {
//   let component: CrearProductoComponent;
//   let fixture: ComponentFixture<CrearProductoComponent>;
//   let productoService: ProductoService;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ CrearProductoComponent ],
//       imports: [
//         CommonModule,
//         HttpClientModule,
//         RouterTestingModule,
//         ReactiveFormsModule,
//         FormsModule
//       ],
//       providers: [HttpService],
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(CrearProductoComponent);
//     component = fixture.componentInstance;
//     productoService = TestBed.inject(ProductoService);
//     spyOn(productoService, 'guardar').and.returnValue(
//       of(true)
//     );
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('formulario es invalido cuando esta vacio', () => {
//     expect(component.productoForm.valid).toBeFalsy();
//   });

//   it('Registrando producto', () => {
//     expect(component.productoForm.valid).toBeFalsy();
//     component.productoForm.controls.id.setValue('001');
//     component.productoForm.controls.descripcion.setValue('Producto test');
//     expect(component.productoForm.valid).toBeTruthy();

//     component.cerar();

//     // Aca validamos el resultado esperado al enviar la petición
//   });
// });
