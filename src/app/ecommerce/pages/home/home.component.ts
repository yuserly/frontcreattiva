import { DominiosService } from './../../services/dominios.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Categorias,
  Subcategorias,
  Carrito,
  Productos
} from '../../interfaces/ecommerce.interface';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriasService } from '../../services/categorias.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  categorias: Categorias[] = [];
  productos: Productos[] = [];
  subcategorias: Subcategorias[] = [];
  productosbuscados: Productos[] = [];
  logueado: boolean = false;

  @ViewChild('subfoco') subfoco!: ElementRef;

  form:FormGroup = this.fb.group({
    textobuscar: [
      '',
      [Validators.required],
    ]
  });

  constructor(
    private categoriasServices: CategoriasService,
    public DominiosService: DominiosService,
    private router: Router,
    private fb: FormBuilder
  ) {
    let token = localStorage.getItem('token')!;
      let empresaselect = localStorage.getItem('empresaselect')!;

      if(token && empresaselect){
        this.logueado = true;
      }
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

    //limpiar variable de busqueda
    if (localStorage.getItem('resultados_busqueda')) {
      localStorage.removeItem('resultados_busqueda');
    }


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
      if(this.subcategorias[0].id_subcategoria /*!= 26*/){
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

    this.subfoco.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });

  }

  buscarproducto(id: number) {
    this.categoriasServices.getproductos(id).subscribe((productos) => {
      this.productos = productos;
  });


  }

  obtenerproductos(productos: Productos[]){
    this.productos = productos;
  }

  busquedageneral(){
    
    if(this.form.invalid){
      this.form.markAllAsTouched()
      return;
    }

    let resultados:any = [];

    if (localStorage.getItem('resultados_busqueda')) {

      this.productosbuscados = JSON.parse(localStorage.getItem('resultados_busqueda')!);

    } else {

      this.productosbuscados = [];

    }

    let textoBusqueda = this.form.value.textobuscar;

    this.categoriasServices.getProductosCoincidentes(textoBusqueda).subscribe((productosEncontrados) => {
      console.log(productosEncontrados);

      this.productosbuscados = productosEncontrados;

      localStorage.setItem('resultados_busqueda', JSON.stringify(this.productosbuscados));

      console.log(this.productosbuscados);

      this.router.navigate(['resultados-busqueda']);
      
    });

  }


}
