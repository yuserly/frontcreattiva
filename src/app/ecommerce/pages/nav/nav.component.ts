import { DominiosService } from './../../services/dominios.service';
import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Productos, Categorias, Subcategorias, } from '../../interfaces/ecommerce.interface';
import { CategoriasService } from '../../services/categorias.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
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
export class NavComponent implements OnInit {

  //menú movil
  margintop:number = 0;

  isOpen = true;

  openCategorias = false;

  openSubcategorias = false;

  openSearch = false;

  btnSearch:string = 'fas fa-search';

  @Input() mostrarbuscador!:boolean;
  //**************** */

  categorias: Categorias[] = [];
  productos: Productos[] = [];
  subcategorias: Subcategorias[] = [];

  countcarro:number = 0;
  carvisible: boolean = true;
  productosbuscadosarray!: Productos[];

  @ViewChild('subfoco') subfoco!: ElementRef;
  @ViewChild('subfocoplanes') subfocoplanes!: ElementRef;

  //variable enviada al componente resultados-busqueda
  @Output() productosbuscados: EventEmitter<Productos[]> = new EventEmitter();

  constructor(public DominiosService: DominiosService, private router: Router, private categoriasServices: CategoriasService) { }

  ngOnInit(): void {

    console.log(this.router.routerState.snapshot.url)
    let ruta = this.router.routerState.snapshot.url;

    if(ruta == '/facturacion' || ruta == '/configuracion' || ruta == '/formulario-pago' || ruta == '/carrito' ){
      this.carvisible = false;
    }

    let carrito = JSON.parse(localStorage.getItem('carrito')!);

    if (!carrito || carrito.length == 0) {
      this.countcarro = 0;
    }else{
      this.countcarro = carrito.length;
    }

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

  }

  productosp(productosb:Productos[]){

    this.productosbuscadosarray = productosb;
    this. productosbuscados.emit(this.productosbuscadosarray);

  }

  menuCategorias(opc:boolean){
    this.openCategorias = opc;
  }
  menuSubcategorias(opc:boolean){
    this.openSubcategorias = opc;
  }
  menuSearch(){
    if(this.openSearch){
      this.openSearch = false;
      this.btnSearch = 'fas fa-search';
    }else{
      this.openSearch = true;
      this.btnSearch = 'far fa-times-circle';
    }
  }

  ocultarmenu(opc:boolean){
    this.menuCategorias(false);
    this.menuSubcategorias(false);
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

  buscarproducto(id: number) {

    this.categoriasServices.getproductos(id).subscribe((productos) => {
        this.productos = productos;
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
