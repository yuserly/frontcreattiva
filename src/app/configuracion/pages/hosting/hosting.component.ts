import { Component, OnInit } from '@angular/core';
import { DominiosService } from '../../../ecommerce/services/dominios.service';
import { Productos, Periodo, Carrito, TotalCarro, SistemaOperativo } from '../../../ecommerce/interfaces/ecommerce.interface';
import { CategoriasService } from '../../../ecommerce/services/categorias.service';

@Component({
  selector: 'app-hosting',
  templateUrl: './hosting.component.html',
  styles: [
  ]
})
export class HostingComponent implements OnInit {

  producto!:Productos;
  periodos:Periodo[] = [];
  carrito:Carrito[] = [];
  totalcarroarray!: TotalCarro;
  sistemaOperativo: SistemaOperativo[] = [];


  constructor(private categoriasServices: CategoriasService) { }

  ngOnInit(): void {

    let index = JSON.parse(localStorage.getItem('index')!);

    let carrito: Carrito[] =  JSON.parse(localStorage.getItem('carrito')!);

    this.carrito = JSON.parse(localStorage.getItem('carrito')!);

    this.producto = carrito[index].producto;

    this.getperiodos(this.producto.id_producto)

    if(this.producto.subcategoria_id == 6 || this.producto.subcategoria_id == 8 || this.producto.subcategoria_id == 9){

      this.getos();

    }


  }

  getperiodos(id:number){

    this.categoriasServices.getperiodos(id).subscribe( resp => {

      this.periodos = resp;

      console.log(resp)

    })


  }

  getos(){

    this.categoriasServices.getsistemasoperativo().subscribe( resp => {

      this.sistemaOperativo = resp;

    })
  }

  totalcarro(carrito:TotalCarro){

    this.totalcarroarray = carrito;

  }


}
