import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pago-exitoso',
  templateUrl: './pago-exitoso.component.html',
  styleUrls: ['./pago-exitoso.component.css']
})
export class PagoExitosoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

      localStorage.removeItem('carrito')
      localStorage.removeItem('index')
      localStorage.removeItem('infopago')
  }

}
