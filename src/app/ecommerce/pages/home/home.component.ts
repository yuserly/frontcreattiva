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
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { OwlOptions } from 'ngx-owl-carousel-o';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ],
  animations: [

    trigger('openCloseCategorias', [
      // ...
      state('open', style({
        left: '0'
      })),
      state('closed', style({
        left: '-100%'
      })),
      transition('open => closed', [
        animate('0.4s')
      ]),
      transition('closed => open', [
        animate('0.4s')
      ]),
    ]),
    trigger('openCloseSubcategorias', [
      // ...
      state('open', style({
        right: '0'
      })),
      state('closed', style({
        right: '100%'
      })),
      transition('open => closed', [
        animate('0.4s')
      ]),
      transition('closed => open', [
        animate('0.4s')
      ]),
    ])


  ],
})
export class HomeComponent implements OnInit {

isOpen = true;

openCategorias = false;

openSubcategorias = false;


customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
 

  categorias: Categorias[] = [];
  productos: Productos[] = [];
  subcategorias: Subcategorias[] = [];
  productosbuscados: Productos[] = [];
  logueado: boolean = false;

  //menu movil
  mostrarNavSubcategorias:boolean = false;
  mostrarBusqueda:boolean = false;
  btnSearch:string = 'fas fa-search';
  
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
    this.itemsCarrito();

    this.mostrarNavSubcategorias = true;

  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  menuCategorias(opc:boolean){
    this.openCategorias = opc;
  }
  menuSubcategorias(opc:boolean){
    this.openSubcategorias = opc;
    
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
    this.mostrarNavSubcategorias = true;
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

  itemsCarrito(){
    let index = JSON.parse(localStorage.getItem('index')!);

    let carrito: Carrito[] =  JSON.parse(localStorage.getItem('carrito')!);

    if(carrito.length>0){
      this.DominiosService.totalCarro = carrito.length;
    }else{
      this.DominiosService.totalCarro = 0;
    }

  }

  mostrarsubmenu(){
    this.mostrarNavSubcategorias = false;
  }

  ocultarmenu(opc:boolean){
    //this.mostrarNavSubcategorias = false;
    this.menuCategorias(false);
    this.menuSubcategorias(false);
  }

  mostrarBuscador(){
    if(this.mostrarBusqueda){
      this.mostrarBusqueda = false;
      this.btnSearch = 'fas fa-search';
    }else{
      this.mostrarBusqueda = true;
      this.btnSearch = 'far fa-times-circle';
    }
    
  }


}
