import { DominiosService } from './../../services/dominios.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Productos } from '../../interfaces/ecommerce.interface';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  countcarro:number = 0;
  carvisible: boolean = true;
  productosbuscadosarray!: Productos[];

  constructor(public DominiosService: DominiosService, private router: Router) { }

  ngOnInit(): void {

    console.log(this.router.routerState.snapshot.url)
    let ruta = this.router.routerState.snapshot.url;

    if(ruta == '/facturacion' || ruta == '/configuracion' || ruta == '/formulario-pago' || ruta == '/carrito' ){
      this.carvisible = false;
    }

    let carrito = JSON.parse(localStorage.getItem('carrito')!);

    if (!carrito || carrito.length == 0) {
      this.countcarro = 0;
    }else{
      this.countcarro = carrito.length;
    }

  }

  productosp(productosb:Productos[]){

    this.productosbuscadosarray = productosb;
    console.log("datos obtenidos por emit");
    console.log(this.productosbuscadosarray);

  }

}
