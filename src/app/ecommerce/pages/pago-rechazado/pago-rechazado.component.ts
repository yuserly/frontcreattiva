import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pago-rechazado',
  templateUrl: './pago-rechazado.component.html',
  styleUrls: ['./pago-rechazado.component.css']
})
export class PagoRechazadoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

      localStorage.removeItem('carrito')
      localStorage.removeItem('index')
      localStorage.removeItem('infopago')
      localStorage.removeItem('comprasucursal')

  }

}
