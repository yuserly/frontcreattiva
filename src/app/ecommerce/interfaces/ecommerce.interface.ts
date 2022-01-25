export interface Categorias {
  id_categoria: number;
  nombre: string;
  slug: string;
  subcategoria: Subcategorias[],
  active:   boolean
}

export interface Subcategorias {
  id_subcategoria: number;
  nombre: string;
  slug: string;
  icono: string;
  categoria_id: number;
  categoria:  Categorias;
  active:   boolean
}


export interface Productos {
  id_producto: number;
  nombre: string;
  slug: string;
  meta_title: string;
  meta_description : string;
  precio:number,
  subcategoria_id: number;
  tipo_producto: number;
  caracteristicas:  Caracteristicas[];
  subcategoria: Subcategorias;
  active:   boolean
}

export interface Caracteristicas{

  id_carateristica_producto: number,
  nombre: string;
  capacidad: string;
  producto_id: number
}


