import { Component, OnInit } from '@angular/core';
import { Productos } from '../../../ecommerce/interfaces/ecommerce.interface';

@Component({
  selector: 'app-main2',
  templateUrl: './main2.component.html',
  styles: [
  ]
})
export class Main2Component implements OnInit {

  producto!:Productos;

  constructor() { }

  ngOnInit(): void {

    this.producto = JSON.parse(localStorage.getItem('producto')!);

    console.log(this.producto)
  }

}
