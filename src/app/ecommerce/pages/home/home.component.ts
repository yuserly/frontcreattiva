import { DominiosService } from './../../services/dominios.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Categorias,
  Subcategorias,
  Carrito
} from '../../interfaces/ecommerce.interface';
import { CategoriasService } from '../../services/categorias.service';
import { Productos } from '../../interfaces/ecommerce.interface';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  categorias: Categorias[] = [];
  subcategorias: Subcategorias[] = [];
  productos: Productos[] = [];

  constructor(
    private categoriasServices: CategoriasService,
    public DominiosService: DominiosService,
    private router: Router
  ) {
    // this.router.navigate(['/hosting/hosting-ssd']);
  }

  ngOnInit(): void {
    this.categoriasServices.getCategorias().subscribe((categorias) => {
      categorias.map((p, i) => {
        if (i == 0) {
          p['active'] = true;
        } else {
          p['active'] = false;
        }

        return p;
      });

      this.categorias = categorias;
    });

    this.buscarsubcategoria(1);

    this.itemsCarrito();
  }

  buscarsubcategoria(id: number) {
    this.categoriasServices.getsubcategoria(id).subscribe((subcategorias) => {
      subcategorias.map((p, i) => {
        if (i == 0) {
          p['active'] = true;
        } else {
          p['active'] = false;
        }

        return p;
      });

      this.subcategorias = subcategorias;
      if(this.subcategorias[0].id_subcategoria != 26){
        this.buscarproducto(this.subcategorias[0].id_subcategoria)
      }else{
        this.productos = [];
      }
    });
  }

  activar(id: number) {
    this.categorias.map((p, i) => {
      if (i == id) {
        p['active'] = true;
      } else {
        p['active'] = false;
      }
    });
  }

  buscarproducto(id: number) {
    this.categoriasServices.getproductos(id).subscribe((productos) => {
      this.productos = productos;
  });


  }

  obtenerproductos(productos: Productos[]){
    this.productos = productos;
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

}
