import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Carrito, TotalCarro } from '../../interfaces/ecommerce.interface';
import { CategoriasService } from '../../services/categorias.service';
import { DominiosService } from '../../services/dominios.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-carro',
  templateUrl: './carro.component.html',
  styleUrls: ['./carro.component.css']
})
export class CarroComponent implements OnInit {

  carrito:Carrito[] = [];
  totalcarroarray!: TotalCarro;
  statusCarrito:number = 0;
  aplicarCupon:number = 1;
  mostrarMovil:boolean = false;

  constructor( private router: Router, private CategoriasService: CategoriasService, private DominiosService:DominiosService) { }

  ngOnInit(): void {

    let carrito = JSON.parse(localStorage.getItem('carrito')!);

    this.carrito = carrito;

    if(!carrito || carrito.length == 0){
      this.statusCarrito = 0;
      this.itemsCarrito();
    }else{
      this.statusCarrito = 1;
      this.itemsCarrito();
      this.totalcarroarray = this.CategoriasService.calculototalcarro();
    }

  }

  eliminarcarro(i:number){

    Swal.fire({
      position: 'center',
      title: '¿Estás seguro de querer eliminar el producto?',
      showConfirmButton: true,
      confirmButtonColor: '#005AD2',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      width: '350px',
      customClass: {
          popup: 'alerta'
        }
    }).then((result) => {
      if (result.isConfirmed) {
        let carrito: Carrito[] = JSON.parse(localStorage.getItem('carrito')!);

        carrito.splice(i, 1);

        localStorage.setItem('carrito', JSON.stringify(carrito));

        carrito = JSON.parse(localStorage.getItem('carrito')!);

        if(carrito.length > 0){

          this.carrito = carrito;

          this.totalcarroarray = this.CategoriasService.calculototalcarro();

          this.statusCarrito = 1;

        }else{

          this.statusCarrito = 0;

        }
      }
    })

  }

  vaciarcarro(){

    Swal.fire({
      position: 'center',
      title: '¿Estás seguro de querer vaciar el carro?',
      showConfirmButton: true,
      confirmButtonColor: '#005AD2',
      showCancelButton: true,
      confirmButtonText: 'Vaciar',
      cancelButtonText: 'Cancelar',
      width: '350px',
      customClass: {
          popup: 'alerta'
        }
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('carrito');
        localStorage.removeItem('index');
        localStorage.removeItem('comprasucursal')

        this.itemsCarrito();
        this.statusCarrito = 0;
      }else{
        this.ngOnInit();
      }
    })

  }

  cambiarperiodo(i:number, periodo:any){

    this.carrito[i].periodo = parseInt(periodo.value);

    localStorage.setItem('carrito',JSON.stringify(this.carrito));

    this.totalcarroarray = this.CategoriasService.calculototalcarro();

  }

  finalizarcompra(){

    this.router.navigate(['/login-rapido']);


  }

  itemsCarrito(){
    let index = JSON.parse(localStorage.getItem('index')!);

    let carrito: Carrito[] =  JSON.parse(localStorage.getItem('carrito')!);

    console.log(carrito);

    if(carrito){
      this.DominiosService.totalCarro = carrito.length;
    }else{
      this.DominiosService.totalCarro = 0;
    }


  }

  totalcarro(carrito:TotalCarro){

    this.totalcarroarray = carrito;

  }

}
