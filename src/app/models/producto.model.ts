export interface Categoria {
  id: string;
  nombre: string;
}

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  imagen: string;
}

export interface MenuData {
  categorias: Categoria[];
  productos: Producto[];
}
