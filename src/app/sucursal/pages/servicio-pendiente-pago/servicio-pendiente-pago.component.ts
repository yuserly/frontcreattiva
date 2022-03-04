import { Component, OnInit } from '@angular/core';
import { Servicios } from '../../../ecommerce/interfaces/sucursal.interfaces';
import { SucursalService } from '../../services/sucursal.service';

@Component({
  selector: 'app-servicio-pendiente-pago',
  templateUrl: './servicio-pendiente-pago.component.html',
  styleUrls: ['./servicio-pendiente-pago.component.css']
})
export class ServicioPendientePagoComponent implements OnInit {

  constructor(private sucursal:SucursalService) { }

  servicios:Servicios[] = [];

  ngOnInit(): void {

    let idempresa = localStorage.getItem('empresaselect');

    if(idempresa){

      this.sucursal.getServiciosPendientePago
      (idempresa).subscribe(resp => {
        console.log(resp)
        this.servicios = resp;
      })

    }


  }

}
