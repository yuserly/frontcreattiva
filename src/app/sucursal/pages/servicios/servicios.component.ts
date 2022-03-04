import { Component, OnInit } from '@angular/core';
import { SucursalService } from '../../services/sucursal.service';
import { Servicios } from '../../../ecommerce/interfaces/sucursal.interfaces';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CategoriasService } from 'src/app/ecommerce/services/categorias.service';
import { Productos } from 'src/app/ecommerce/interfaces/ecommerce.interface';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css'],
})
export class ServiciosComponent implements OnInit {
  constructor(
    private sucursal: SucursalService,
    private routeparams: ActivatedRoute,
    private CategoriasService:CategoriasService
  ) {}

  servicios: Servicios[] = [];
  productos:Productos[] = [];

  ngOnInit(): void {
    let idempresa = localStorage.getItem('empresaselect')!;
    this.routeparams.params
      .pipe(
        switchMap(({ slug }) => this.sucursal.getServicios(idempresa, slug))
      )
      .subscribe((resp) => {
        this.servicios = resp;
      });
  }

  buscarproductos(){

    this.routeparams.params
      .pipe(
        switchMap(({ slug }) => this.sucursal.getsubcategoriaslug( slug))
      )
      .subscribe((resp) => {
        this.CategoriasService.getproductos(resp.id_subcategoria).subscribe(resp =>{
          this.productos = resp;
        });
      });

  }
}
