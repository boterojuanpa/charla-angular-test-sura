
export class Producto {
    id: string;
    descripcion: string;
    precio: number;
    aplicaIva: boolean;
    canastaBasica: boolean;
    valorIva?: number

    constructor(id: string, descripcion: string, precio: number, aplicaIva: boolean, canastaBasica: boolean, valorIva?: number, ) {
        this.id = id;
        this.descripcion = descripcion;
        this.precio  = precio;
        this.aplicaIva = aplicaIva;
        this.valorIva = valorIva
        this.canastaBasica = canastaBasica;

    }

    public calcularIva() {
        if (this.aplicaIva) {
          this.valorIva = this.precio * 0.19;
        }
      }
}
