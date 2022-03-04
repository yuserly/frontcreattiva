export interface Servicios {
  id_servicio:       number;
  codigo_venta:      number;
  glosa:             string;
  cantidad:          number;
  producto_id:       number;
  periodo_id:        number;
  os_id:             number;
  version_id:        number;
  administrado:      number;
  ip:                null;
  dominio:           string;
  fecha_inscripcion: Date;
  fecha_inicio:      null;
  fecha_renovacion:  null;
  empresa_id:        number;
  estado_id:         number;
  estado_creado:     number;
  created_at:        Date;
  updated_at:        Date;
  detalleventa:      Detalleventa[];
  periodo:           Periodo;
}

export interface Detalleventa {
  id_detalle_ventas: number;
  cantidad:          number;
  precio_mensual:    number;
  precio_unitario:   number;
  descuento:         number;
  precio_descuento:  number;
  precio_pagado:     number;
  venta_id:          number;
  servicio_id:       number;
  created_at:        Date;
  updated_at:        Date;
  venta:             Venta;
}

export interface Venta {
  id_venta:           number;
  codigo:             number;
  neto:               number;
  descuento:          number;
  iva:                number;
  total_peso:         number;
  total_usd:          number;
  precio_usd:         number;
  precio_uf:          number;
  estado_id:          number;
  estado_facturacion: number;
  metodo_pago:        string;
  fecha_pago:         null;
  hora_pago:          null;
  pago_id_paypal:     null;
  created_at:         Date;
  updated_at:         Date;
}

export interface Periodo {
  id_periodo: number;
  periodo:    string;
  meses:      number;
  descuento:  number;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
}
