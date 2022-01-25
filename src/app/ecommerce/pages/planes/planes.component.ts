import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Productos } from '../../interfaces/ecommerce.interface';
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

      localStorage.setItem('producto',JSON.stringify(producto));

      this.router.navigate(['/configuraciones']);
  }

}
