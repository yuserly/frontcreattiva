import { DominiosService } from './../../services/dominios.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  countcarro:number = 0;
  carvisible: boolean = true;

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

}
