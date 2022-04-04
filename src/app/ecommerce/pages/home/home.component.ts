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



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ],
  animations: [

    trigger('openCloseCategorias', [
  
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
    ]),
    trigger('openCloseSearch', [

      state('open', style({
        display: 'block',
        opacity: 1
      })),
      state('closed', style({
        display: 'none',
        opacity: 1
      })),
      transition('open => closed', [
        animate('0.1s')
      ]),
      transition('closed => open', [
        animate('0.1s')
      ]),
    ])


  ]
})
export class HomeComponent implements OnInit {

//menú movil
margintop:number = 0;

isOpen = true;

openCategorias = false;

openSubcategorias = false;

openSearch = false;

btnSearch:string = 'fas fa-search';
 

  categorias: Categorias[] = [];
  productos: Productos[] = [];
  subcategorias: Subcategorias[] = [];
  productosbuscados: Productos[] = [];
  logueado: boolean = false;
  
  @ViewChild('subfoco') subfoco!: ElementRef;
  @ViewChild('subfocoplanes') subfocoplanes!: ElementRef;

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
    //actualizar n carrito
    this.itemsCarrito();
    let carrito = JSON.parse(localStorage.getItem('carrito')!);

    if (carrito.length>0) {
      this.margintop = 110;
    }else{
      this.margintop = 0;
    }

  }

  menuCategorias(opc:boolean){
    this.openCategorias = opc;
  }
  menuSubcategorias(opc:boolean){
    this.openSubcategorias = opc;
  }
  menuSearch(){
    let carrito = JSON.parse(localStorage.getItem('carrito')!);

    if(this.openSearch){
      this.openSearch = false;
      this.btnSearch = 'fas fa-search';

      if (carrito && carrito.lenght>0) {
        this.margintop = 110;
      }else{
        this.margintop = 0;
      }

    }else{
      this.openSearch = true;
      this.btnSearch = 'far fa-times-circle';
      this.margintop = 110;
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

  itemsCarrito(){
    let index = JSON.parse(localStorage.getItem('index')!);

    let carrito: Carrito[] =  JSON.parse(localStorage.getItem('carrito')!);

    if(carrito.length>0){
      this.DominiosService.totalCarro = carrito.length;
    }else{
      this.DominiosService.totalCarro = 0;
    }

  }

  ocultarmenu(opc:boolean){
    this.menuCategorias(false);
    this.menuSubcategorias(false);
  }

  seleccionarcategoria(id:number,id_subcategoria:number){

    this.subcategorias.map((p,i) => {
      if(i == id){
        p["active"] = true;
      }else{
        p["active"] = false;
      }
    })

    if(id_subcategoria != 31){
      this.buscarproducto(id_subcategoria);
    }else{
      this.productos = [];
    }

    this.ocultarmenu(false);
    this.subfocoplanes.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
    //this.statusmenu.emit(false);

  }


}
