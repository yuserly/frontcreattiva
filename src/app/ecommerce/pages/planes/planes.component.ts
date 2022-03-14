import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Productos, Carrito } from '../../interfaces/ecommerce.interface';
import { CategoriasService } from '../../services/categorias.service';
import { PeriodoComponent } from '../periodo/periodo.component';
@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styles: [],
})
export class PlanesComponent implements OnInit {

  @ViewChild(PeriodoComponent) PeriodoView!: PeriodoComponent;

  @Input() productos!: Productos[];

  constructor(
    private router: Router,
    private categoriasServices: CategoriasService
  ) {}

  ngOnInit(): void {}

  buscarproducto(id: number) {
    this.categoriasServices.getproductos(id).subscribe((productos) => {
      this.productos = productos;
    });
  }

  contratar(producto: Productos) {
    if (localStorage.getItem('carrito')) {
      let carro: Carrito[] = JSON.parse(localStorage.getItem('carrito')!);

      this.aggcart(producto, carro);


    } else {
      let carro: Carrito[] = [];

      this.aggcart(producto, carro);
    }
  }

  aggcart(producto: Productos,  carro: Carrito[]){

      let periodoselect = this.periodoseleccionado(producto.subcategoria_id);

          this.categoriasServices
            .getperiodos(producto.id_producto)
            .subscribe((resp2) => {
              carro.push({
                producto: producto,
                periodo: periodoselect,
                dominio: '',
                sistemaoperativo: 0,
                versionsistema: 0,
                administrar: 0,
                ip: '',
                periodos: resp2,
                cantidad: 1,
                cupon_descuento: 0,
              });

              const cantidadcarro = carro.length;
              const index = cantidadcarro - 1;

              localStorage.setItem('index', JSON.stringify(index));
              localStorage.setItem('carrito', JSON.stringify(carro));

              let comprasucursal = localStorage.getItem('comprasucursal');

              if(comprasucursal){

                this.router.navigate(['sucursal/configuracion']);
              }else{
                this.router.navigate(['/configuracion']);

              }

            });

  }

  periodoseleccionado(id:number):number{


    //Hosting
    if( id == 1 ||
        id == 2 ||
        id == 3 ||
        id == 4 ||
        id == 5
      ){

      return 4;

    }
    //Certificado SSL
    if(id == 7){

      return 2;

    }
    //vps
    if( id == 9 ||//VPS en Chile
        id == 10 ||//VPS Windows
        id == 12 //VPS Linux administrado
      ){

      return 4;

    }
    if(id == 11 ||//vps amazon linux
       id == 13 ||//vps amazon windows
       id == 19 //streaming radio
      ){
      return 4;
    }
    if(id == 14 ||//Administración para VPS
       id == 28 ||//Housing
       id == 32 //Cloud backup
      ){
      return 4;
    }

    if(id == 8  || //instalación certificado ssl
      id == 15  ||//Migración para VPS
      id == 18 || //Administración para vps por evento
      id == 21 ||//Migración Google Workspace
      id == 23 ||//Licencias microsoft
      id == 26
      ){

      //this.mostrarPagoUnico = 1;

    }

    if(id == 16 || //servidores hp
       id == 17 //servidores dell
      ){
      return  7;

    }
    if(id == 22 //Google Ads
      ){
      return  7;
    }
    if(id == 24 ||//Licencias microsoft 365
      id == 20 //licencias googlw workspace
      ){
      
      return 2;

    }
    if(id == 27 || //almacenamiento adicional google workspace
       id == 29 || //licencias cpanel
       id == 30 //licencias imunify360
      ){
      return 1;
    }else{
      return 0;
    }


  }
}
