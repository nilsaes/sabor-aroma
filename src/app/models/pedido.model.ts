import { Producto } from './producto.model';

export interface ItemPedido {
  producto: Producto;
  cantidad: number;
}