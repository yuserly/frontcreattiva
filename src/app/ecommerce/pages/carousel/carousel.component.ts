import { DominiosService } from './../../services/dominios.service';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Productos, Periodo, Carrito, TotalCarro, SistemaOperativo } from '../../interfaces/ecommerce.interface';
import { CategoriasService } from '../../services/categorias.service';
import { Router } from '@angular/router';
import { DominioComponent } from './../dominio/dominio.component';
import { VpsComponent } from '../vps/vps.component';
import { PeriodoComponent } from '../periodo/periodo.component';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html'
})
export class CarouselComponent implements OnInit {

  banners:any[] = [];

  constructor(private categoriasServices: CategoriasService) { }

  ngOnInit(): void {

    this.categoriasServices.getbanners().subscribe( resp => {

      this.banners = resp;
      console.log(this.banners);

    })

  }

}
