import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pago-transferencia',
  templateUrl: './pago-transferencia.component.html',
  styleUrls: ['./pago-transferencia.component.css']
})
export class PagoTransferenciaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    localStorage.removeItem('carrito')
      localStorage.removeItem('index')
      localStorage.removeItem('infopago')


  }

}
