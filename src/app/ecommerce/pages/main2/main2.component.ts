import { Component, OnInit } from '@angular/core';
import { Productos, Carrito, Periodo } from '../../interfaces/ecommerce.interface';
import { CategoriasService } from '../../services/categorias.service';

@Component({
  selector: 'app-main2',
  templateUrl: './main2.component.html',
  styles: [
  ]
})
export class Main2Component implements OnInit {

  producto!:Productos;
  periodos:Periodo[] = [];

  constructor(private categoriasServices: CategoriasService) { }

  ngOnInit(): void {

    // let index = JSON.parse(localStorage.getItem('index')!);

    // let carrito: Carrito[] =  JSON.parse(localStorage.getItem('carrito')!);

    // this.producto = carrito[index].producto;

    // this.getperiodos(this.producto.id_producto)
  }

  getperiodos(id:number){

    this.categoriasServices.getperiodos(id).subscribe( resp => {

      this.periodos = resp;

      console.log(resp)

    })


  }

}
