import { Productos, Periodo } from './ecommerce.interface';
export interface Dominios {
  code: number;
  desc: string;
  data: Data;
}

export interface Data {
  results: Result[];
}

export interface Result {
  domain: string;
  status: string;
  price:  Price;
  precio_bd: number;
  producto:Productos,
  periodos: Periodo[],
  agregado: boolean,
}

export interface Price {
  product:  Product;
  reseller: Product;
}

export interface Product {
  price:    number;
  currency: Currency;
}

export enum Currency {
  Usd = "USD",
}

export interface PrecioDominios {
  id_precio_dominio: number;
  extension:         string;
  precio:            number;
  created_at:        Date;
  updated_at:        Date;
}
