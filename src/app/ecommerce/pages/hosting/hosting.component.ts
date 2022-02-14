import { DominiosService } from './../../services/dominios.service';
import { Component, OnInit } from '@angular/core';
import { Productos, Periodo, Carrito, TotalCarro, SistemaOperativo } from '../../interfaces/ecommerce.interface';
import { CategoriasService } from '../../services/categorias.service';
import { Router } from '@angular/router';

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

  // lo usamos para colocarle el numero a los pasos de la configuracion

  dominionum:number = 0;
  periodonum:number = 0;



  constructor(private categoriasServices: CategoriasService, private router: Router, private DominiosService: DominiosService) { }

  ngOnInit(): void {

    let index = JSON.parse(localStorage.getItem('index')!);

    let carrito: Carrito[] =  JSON.parse(localStorage.getItem('carrito')!);

    this.carrito = JSON.parse(localStorage.getItem('carrito')!);

    this.producto = carrito[index].producto;

    this.getperiodos(this.producto.id_producto)

    if(this.producto.subcategoria.categoria_id == 1){

      this.dominionum = 1;
      this.periodonum = 2;

    }

    if(this.producto.subcategoria.categoria_id == 2){

      this.dominionum = 1;
      this.periodonum = 4;

    }

    if(this.producto.subcategoria.categoria_id == 3){

      this.periodonum = 1;

    }

    if(this.producto.subcategoria_id == 6 || this.producto.subcategoria_id == 8 || this.producto.subcategoria_id == 9){

      this.getos('linux');

    }else if(this.producto.subcategoria_id == 7 || this.producto.subcategoria_id == 10){
      this.getos('windows');
    }

    this.itemsCarrito();


  }

  getperiodos(id:number){

    this.categoriasServices.getperiodos(id).subscribe( resp => {

      this.periodos = resp;

      console.log(resp)

    })


  }

  getos(tipo:string){

    this.categoriasServices.getsistemasoperativo(tipo).subscribe( resp => {

      this.sistemaOperativo = resp;

    })
  }

  totalcarro(carrito:TotalCarro){

    this.totalcarroarray = carrito;

  }

  validarcarro(){
    this.router.navigate(['/carrito']);
  }

  itemsCarrito(){
    let index = JSON.parse(localStorage.getItem('index')!);

    let carrito: Carrito[] =  JSON.parse(localStorage.getItem('carrito')!);

    this.DominiosService.totalCarro = carrito.length;
  }


}
