import { BoundElementProperty } from '@angular/compiler';
import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Productos, Carrito } from '../../interfaces/ecommerce.interface';
import { CategoriasService } from '../../services/categorias.service';
import { PeriodoComponent } from '../periodo/periodo.component';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styles: [],
})
export class PlanesComponent implements OnInit {

  @ViewChild(PeriodoComponent) PeriodoView!: PeriodoComponent;

  @Input() productos!: Productos[];
  @Input() resultadobusqueda!: boolean;

  productosbuscadosarray!: Productos[];

  owl_planes: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

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

      let periodoselect = 1;

          this.categoriasServices
            .getperiodos(producto.id_producto)
            .subscribe((resp2) => {

              /*
              resp2.forEach((element) => {
                if(element.preseleccionado==1){
                  periodoselect = element.id_periodo;
                }

              });*/

              periodoselect = producto.subcategoria.preseleccionado;

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

  productosp(productosb:Productos[]){

    this.productosbuscadosarray = productosb;
    console.log("datos obtenidos por emit");
    console.log(this.productosbuscadosarray);

    if (localStorage.getItem('resultados_busqueda')) {

      localStorage.setItem('resultados_busqueda', JSON.stringify(this.productosbuscadosarray));

    }

  }

}
