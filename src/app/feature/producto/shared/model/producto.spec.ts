import { Producto } from "./producto"

describe("Pruebas a clase Pruducto", ()=>{

    it("Producto que aplica iva y  no sea canasta basica, valor IVA debería ser el valor del producto por el 19%",()=>{

        let producto = new Producto("1","Panela", 5000, true, false);

        producto.calcularIva();

        expect(producto.valorIva).toBe(950);
    })

    it("producto que no aplique iva, valor iva debería ser indefinido",()=>{

        //arrange
        let producto = new Producto("1","Panela", 5000, false, false);

        //Act
        producto.calcularIva();

        //Assert
        expect(producto.valorIva).toBeUndefined();

    })

    it("producto que aplique iva y sea canasta basica, valor IVA debería ser el 5% sobre el valor del producto",()=>{

        //arrange
        let producto = new Producto("1","Panela", 5000, true, true);

        //Act
        producto.calcularIva();

        //Assert
        expect(producto.valorIva).toBe(250);

    })

    
})