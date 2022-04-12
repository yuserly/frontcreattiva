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
  dominio: boolean,
  ip:boolean,
  sistema_operativo:boolean,
  administrable: boolean,
  active:   boolean
  preseleccionado: number;
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

export interface PreguntasFrecuentes {
  ID_PAGINA: number;
  TITULO_PAGINA: string;
  SUBTITULO_PAGINA: string;
  ID_PAGINA_PERTENECE: number;
  ORDEN_PAGINA:number;
  CONTENIDO_PAGINA: string;
  SCRIPTS_PAGINA: string;
  DESCRIPCION_PAGINA: string;
  KEYWORDS_PAGINA: string;
  title: string;
  h1pagina: string;
  URL_PAGINA: string;
  SI_UTIL: number;
  NO_UTIL: number;
  ESTADO_PAGINA: number;
  titulo: string
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
  periodo: number;
  dominio?: string;
  sistemaoperativo?: number;
  versionsistema?:number;
  administrar?: number;
  ip?: string;
  periodos:Periodo[];
  cantidad?: number;
  cupon_descuento?: number;
  code_cupon_descuento?: number;

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
  preseleccionado:  number;
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
  ahorro: number;

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


export interface Regiones {
  REG_ID:         number;
  REG_NOMBRE:     string;
  REG_CARDINAL:   string;
  remember_token: string;
  created_at:     null;
  updated_at:     null;
}

export interface Comunas {
  COM_ID:         number;
  COM_NOMBRE:     string;
  COM_REGION_ID:  number;
  remember_token: string;
  created_at:     null;
  updated_at:     null;
}

export interface Empresas {
  id_empresa:       number;
  nombre:           string;
  tipo:             number;
  rut:              string;
  email:            string;
  telefono:         string;
  email_empresa:    string;
  telefono_empresa: string;
  razonsocial:      string;
  giro:             string;
  direccion:        string;
  pais:             string;
  region:           number;
  comuna:           number;
  user_id:          number;
  created_at:       Date;
  updated_at:       Date;
  deleted_at:       null;
}

