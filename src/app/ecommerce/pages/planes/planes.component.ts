import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Productos, Carrito } from '../../interfaces/ecommerce.interface';
import { CategoriasService } from '../../services/categorias.service';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styles: [
  ]
})
export class PlanesComponent implements OnInit {

  @Input() productos!:Productos[];

  constructor(private router: Router, private categoriasServices: CategoriasService) { }

  ngOnInit(): void {
  }

  buscarproducto(id: number) {
    this.categoriasServices.getproductos(id).subscribe((productos) => {
      this.productos = productos;
    });
  }

  contratar(producto:Productos){


    if(localStorage.getItem('carrito')){

      let carro: Carrito[] = JSON.parse(localStorage.getItem('carrito')!);

      this.categoriasServices.getperiodo(producto.id_producto,4).subscribe( resp => {

      carro.push({
        producto: producto,
        periodo: resp,
        compradominio: [],
        dominiocliente: '',
        sistemaoperativo: 0,
        versionsistema:0,
        ip: ''
      })

      const cantidadcarro = carro.length;
      const index = cantidadcarro - 1;

      localStorage.setItem('index',JSON.stringify(index));
      localStorage.setItem('carrito',JSON.stringify(carro));

      this.router.navigate(['/configuraciones']);

    })

  }else{

    let carro: Carrito[] = [];


    this.categoriasServices.getperiodo(producto.id_producto,4).subscribe( resp => {

      carro.push({
        producto: producto,
        periodo: resp,
        compradominio: [],
        dominiocliente: '',
        sistemaoperativo: 0,
        versionsistema:0,
        ip: ''
      })

      const cantidadcarro = carro.length;
      const index = cantidadcarro - 1;

      localStorage.setItem('index',JSON.stringify(index));
      localStorage.setItem('carrito',JSON.stringify(carro));

      this.router.navigate(['/configuraciones']);

    })


  }


  }

}
