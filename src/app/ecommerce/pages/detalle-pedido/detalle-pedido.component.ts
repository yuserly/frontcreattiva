import { Component, Input, OnInit } from '@angular/core';
import { TotalCarro } from '../../interfaces/ecommerce.interface';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html'
})
export class DetallePedidoComponent implements OnInit {

  @Input() totalcarroarray!:TotalCarro;

  constructor() { }

  ngOnInit(): void {
    //console.log("total carrito detalles");
    //console.log(this.totalcarroarray);

  }

}
