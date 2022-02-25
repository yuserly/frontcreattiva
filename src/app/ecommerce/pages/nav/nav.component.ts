import { DominiosService } from './../../services/dominios.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  countcarro:number = 0;

  constructor(public DominiosService: DominiosService) { }

  ngOnInit(): void {

    let carrito = JSON.parse(localStorage.getItem('carrito')!);

    if (!carrito || carrito.length == 0) {
      this.countcarro = 0;
    }else{
      this.countcarro = carrito.length;
    }

  }

}
