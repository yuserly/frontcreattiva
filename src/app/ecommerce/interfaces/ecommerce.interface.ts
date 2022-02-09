export interface Categorias {
  id_categoria: number;
  nombre: string;
  slug: string;
  subcategoria: Subcategorias[];
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
  precio:number;
  subcategoria_id: number;
  tipo_producto_id: number;
  caracteristicas:  Caracteristicas[];
  subcategoria: Subcategorias;
  precio_trienal: number;
  ahorro: number;
  descuento: number;
  active:   boolean;
}

export interface Caracteristicas{

  id_carateristica_producto: number;
  nombre: string;
  capacidad: string;
  producto_id: number
}

export interface CompraDominio{
  dominio: string;
  periodo: number;
  precio: number
}
export interface Cliente{

  nombre:string;
  apellido:string;
  rut:string;
  tipo:string;
  giro:string;
  razonsocial:string;
  email:string;
  emailcontacto:string;
  telefono:string;
  telefonocontacto:string;
  direccion:string;
  region:number;
  comuna:number

}

export interface Carrito{

  producto: Productos;
  periodo: any;
  dominio?: string;
  sistemaoperativo?: number;
  versionsistema?:number;
  administrar?: number;
  ip?: string;
  periodos?:Periodo[];

}

export interface Periodo {
  id_periodo:       number;
  periodo:          string;
  meses:            number;
  descuento:        number;
  created_at:       Date;
  updated_at:       Date;
  deleted_at:       null;
  precio_descuento: number;
  precio:           number;
  precio_mensual:   number;
  ahorro:           number;
}

export interface TotalCarro {

  productos: ProductoCarro[];
  neto: number;
  iva: number;
  total: number;
  ahorro: number

}

export interface ProductoCarro {

  nombre: string;
  nombreproducto?: string;
  precio: number;
  precioold: number;
  ahorro: number

}

export interface SistemaOperativo {
  id_os:      number;
  nombre:     string;
  icono:      string;
  tipo:       string;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  versiones:  Versiones[];
  active: number
}

export interface Versiones {
  id_version: number;
  version:    string;
  os_id:      number;
  created_at: Date;
  updated_at: Date;
}


