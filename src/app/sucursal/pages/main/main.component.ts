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

  constructor(private categoriasServices:CategoriasService,
    private router: Router) { }

  ngOnInit(): void {
    this.categoriasServices.getCategorias().subscribe(resp => {
      this.categorias = resp;
    })
  }

}
