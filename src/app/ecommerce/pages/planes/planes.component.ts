import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Productos, Carrito } from '../../interfaces/ecommerce.interface';
import { CategoriasService } from '../../services/categorias.service';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styles: [],
})
export class PlanesComponent implements OnInit {
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

          this.categoriasServices
            .getperiodos(producto.id_producto)
            .subscribe((resp2) => {
              carro.push({
                producto: producto,
                periodo: 0,
                dominio: '',
                sistemaoperativo: 0,
                versionsistema: 0,
                administrar: 0,
                ip: '',
                periodos: resp2,
              });

              const cantidadcarro = carro.length;
              const index = cantidadcarro - 1;

              localStorage.setItem('index', JSON.stringify(index));
              localStorage.setItem('carrito', JSON.stringify(carro));

              this.router.navigate(['/configuracion']);
            });



  }
}
