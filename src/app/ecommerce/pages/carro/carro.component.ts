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
  mostrarBtnFinalizarMovil:boolean = true;
  indexconfig: any[] = [];
  faltaconfig: boolean = false;
  validarhosting: boolean = true;

  constructor( private router: Router, private CategoriasService: CategoriasService, private DominiosService:DominiosService) {

    let carrito: Carrito[] =  JSON.parse(localStorage.getItem('carrito')!);

    /*
    if (!carrito || carrito.length == 0) {

      this.router.navigate(['/']);
      
    }else{

      this.validarconfig();

    }
    */
      if (carrito) {

        if(carrito.length > 0){

          this.validarconfig();

        }
        
      }

      // if(config.config){
      //   localStorage.setItem('index', JSON.stringify(config.index[0]));
      //   let comprasucursal = localStorage.getItem('comprasucursal');

      //         if(comprasucursal){

      //           this.router.navigate(['sucursal/configuracion']);
      //         }else{
      //           this.router.navigate(['/configuracion']);

      //         }
      // }

   }

  ngOnInit(): void {

    let carrito = JSON.parse(localStorage.getItem('carrito')!);

    this.carrito = carrito;

    console.log("componente carrito");
    console.log(this.carrito);

    if(!carrito || carrito.length == 0){
      this.statusCarrito = 0;
      this.itemsCarrito();
    }else{
      this.statusCarrito = 1;
      this.itemsCarrito();
      this.totalcarroarray = this.CategoriasService.calculototalcarro();
    }

  }

  validarconfig(){


    let config = this.CategoriasService.validarconfigcarro();

    if(config.index){

      this.indexconfig = config.index;
      this.faltaconfig = config.config;

    }


  }

  limpiarDomGuardado(i:number){
    let index = JSON.parse(localStorage.getItem('index')!);
    let carrito: Carrito[] =  JSON.parse(localStorage.getItem('carrito')!);
    carrito[index].dominio = '';
    localStorage.setItem('carrito',JSON.stringify(carrito));

    localStorage.setItem('index', JSON.stringify(i));
    this.router.navigate(['/configuracion']);
    
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

        this.validarconfig();
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

  cambiardominiohosting(i:number, dominio:any){

    this.carrito[i].dominio = dominio.value;

    localStorage.setItem('carrito',JSON.stringify(this.carrito));

    this.totalcarroarray = this.CategoriasService.calculototalcarro();

    console.log(this.carrito);

  }

  finalizarcompra(){

    if(this.validardominios()==0){
      this.router.navigate(['/login-rapido']);
    }else{
      this.validarhosting = false;
      let el = document.getElementById("hostingsindominios");
      if(el){el.scrollIntoView({ behavior: 'smooth' });}
      console.log("hay hosting sin dominios");
    }


  }

  validardominios():number{

    let carrito: Carrito[] =  JSON.parse(localStorage.getItem('carrito')!);
    let cont = 0;

    console.log(carrito);

    if(carrito.length>=1){

      carrito.forEach((element) => {


        if(element.producto.subcategoria_id==1 ||
          element.producto.subcategoria_id==2 ||
          element.producto.subcategoria_id==3 ||
          element.producto.subcategoria_id==4 ||
          element.producto.subcategoria_id==5 ||
          element.producto.subcategoria_id==7 ||
          element.producto.subcategoria_id==8 ||
          element.producto.subcategoria_id==9 ||
          element.producto.subcategoria_id==12 ||
          element.producto.subcategoria_id==20 ||
          element.producto.subcategoria_id==22)
        if(!element.dominio){
          cont++;
        }

      });

    }

    return cont;

  }

  itemsCarrito(){
    let index = JSON.parse(localStorage.getItem('index')!);

    let carrito: Carrito[] =  JSON.parse(localStorage.getItem('carrito')!);

    if(carrito){
      this.DominiosService.totalCarro = carrito.length;
    }else{
      this.DominiosService.totalCarro = 0;
    }


  }

  totalcarro(carrito:TotalCarro){

    this.totalcarroarray = carrito;


  }



  configurar(i:number){
    localStorage.setItem('index', JSON.stringify(i));
    this.router.navigate(['/configuracion']);
  }

}
