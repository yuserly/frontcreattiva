import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  Servicios,
  Venta,
  Detalleventa,
} from '../../../ecommerce/interfaces/sucursal.interfaces';
import { SucursalService } from '../../services/sucursal.service';

@Component({
  selector: 'app-servicio-pendiente-pago',
  templateUrl: './servicio-pendiente-pago.component.html',
  styleUrls: ['./servicio-pendiente-pago.component.css'],
})
export class ServicioPendientePagoComponent implements OnInit {
  constructor(private sucursal: SucursalService) {}

  servicios: Venta[] = [];
  detallesventa: Detalleventa[] = [];
  urlpago: string = '';
  token: string = '';
  mediodepago: number = 0;
  totalpagar:number = 0;

  @ViewChild('formpago') formpago!: ElementRef<HTMLFormElement>;
  @ViewChild('btnpago') btnpago!: ElementRef<HTMLFormElement>;
  ngOnInit(): void {
    let idempresa = localStorage.getItem('empresaselect');

    if (idempresa) {
      this.sucursal.facturapendientepago(idempresa).subscribe((resp) => {
        console.log("Pendientes de pago");
        console.log(resp);
        this.servicios = resp;
      });
    }
  }

  verdetalles(detalles: Detalleventa[]) {
    this.detallesventa = detalles;
  }

  pagar(id_venta: number, mediopago: number, total_peso: number ) {
    let data = {
      id_venta: id_venta,
      mediopago: mediopago,
    };
    this.sucursal.pagarfactura(data).subscribe((resp) => {
      console.log(resp);
      if (resp.url) {
        if (mediopago == 1) {
          this.urlpago = resp.url;
          this.token = resp.token;
        } else {
          this.urlpago = resp.url;
        }
        this.totalpagar = total_peso;

        this.mediodepago = mediopago;
      }
    });
  }
}
