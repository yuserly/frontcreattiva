import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import {
  Categorias,
  Subcategorias,
  Carrito,
  Productos
} from '../../interfaces/ecommerce.interface';

@Component({
  selector: 'app-resultados-busqueda',
  templateUrl: './resultados-busqueda.component.html'
})
export class ResultadosBusquedaComponent implements OnInit {

  statusResultado:boolean = false;
  productos_resultado!: Productos[];
  productosbuscadosarray!: Productos[];
  constructor() { }

  ngOnInit(): void {

    if (localStorage.getItem('resultados_busqueda')) {

      this.productos_resultado = JSON.parse(localStorage.getItem('resultados_busqueda')!);
      this.statusResultado = true;
    } else {

      this.productos_resultado = [];
      this.statusResultado = false;
    }

    console.log("resultados de busqueda");
    console.log(this.productos_resultado);

  }


  productosp(productosb:Productos[]){

    this.productosbuscadosarray = productosb;
    console.log("datos obtenidos por emit");
    console.log(this.productosbuscadosarray);

    if (localStorage.getItem('resultados_busqueda')) {

      localStorage.setItem('resultados_busqueda', JSON.stringify(this.productosbuscadosarray));

    }

  }

}
