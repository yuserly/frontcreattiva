import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Carrito, TotalCarro } from '../../../ecommerce/interfaces/ecommerce.interface';
import { CategoriasService } from '../../../ecommerce/services/categorias.service';

@Component({
  selector: 'app-carro',
  templateUrl: './carro.component.html',
  styleUrls: ['./carro.component.css']
})
export class CarroComponent implements OnInit {

  carrito:Carrito[] = [];
  totalcarroarray!: TotalCarro;

  constructor(private router: Router, private CategoriasService: CategoriasService) { }

  ngOnInit(): void {

    this.carrito = JSON.parse(localStorage.getItem('carrito')!);

    this.totalcarroarray = this.CategoriasService.calculototalcarro();
  }

  eliminarcarro(i:number){
    let carrito: Carrito[] = JSON.parse(localStorage.getItem('carrito')!);

    carrito.splice(i, 1);

    localStorage.setItem('carrito', JSON.stringify(carrito));

    carrito = JSON.parse(localStorage.getItem('carrito')!);

    if(carrito.length > 0){

      this.carrito = carrito;

      this.totalcarroarray = this.CategoriasService.calculototalcarro();
    }else{
      this.router.navigate(['/']);

    }


  }

}
