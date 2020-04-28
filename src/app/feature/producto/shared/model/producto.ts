const IVA_PRODUCTO_CANASTA_BASICA = 0.05;
const IVA_PRODUCTO_GENERAL = 0.19;
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
          let ivaAplicar = this.canastaBasica ? IVA_PRODUCTO_CANASTA_BASICA : IVA_PRODUCTO_GENERAL;
          this.valorIva = this.precio * ivaAplicar;
        }
      }
}
