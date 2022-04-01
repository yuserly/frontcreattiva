import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriasService } from '../../services/categorias.service';
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

  productos_resultado!: Productos[];
  productosbuscadosarray!: Productos[];
  mostrarbuscador:boolean = false;

  
  constructor(
    private router: Router,
    private categoriasServices: CategoriasService
  ) { }

  ngOnInit(): void {

    if (localStorage.getItem('resultados_busqueda')) {

      this.productos_resultado = JSON.parse(localStorage.getItem('resultados_busqueda')!);
    } else {

      this.productos_resultado = [];
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

  updtproductosmovil(productosb:Productos[]){

    this.productosbuscadosarray = productosb;

    if(this.productosbuscadosarray.length>0){

      if (localStorage.getItem('resultados_busqueda')) {

        localStorage.setItem('resultados_busqueda', JSON.stringify(this.productosbuscadosarray));
  
      }
      
      this.productos_resultado = this.productosbuscadosarray;

    }else{
      this.productos_resultado = [];
    }


  }

  updateproductosb(productosb:Productos[]){

    this.productosbuscadosarray = productosb;
    this.productos_resultado = this.productosbuscadosarray;

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

  productossearch(){

   

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




}
