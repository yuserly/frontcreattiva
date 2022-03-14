import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categorias } from 'src/app/ecommerce/interfaces/ecommerce.interface';
import { CategoriasService } from 'src/app/ecommerce/services/categorias.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  categorias:Categorias[] = [];
  nombreempresa:string = '';
  nombre:string = '';

  constructor(private categoriasServices:CategoriasService,
    private router: Router) {
      let usuario = JSON.parse(localStorage.getItem('usuario')!);
      this.nombre = usuario.nombre;

      if(usuario.razonsocial){
        this.nombreempresa = usuario.razonsocial;

      }else{
        this.nombreempresa = usuario.nombre;

      }

    }

  ngOnInit(): void {
    this.categoriasServices.getCategorias().subscribe(resp => {
      this.categorias = resp;
    })
  }

}
