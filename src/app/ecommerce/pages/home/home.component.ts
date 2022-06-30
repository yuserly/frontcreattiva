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
import { ValidatorService } from '../../../shared/validator/validator.service';
import Swal from 'sweetalert2';


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

loadingCategorias = false;

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
  lang:string = '';
  nombreUsuario:string = '';

  data = {
    email:''
  }

  @ViewChild('subfoco') subfoco!: ElementRef;
  @ViewChild('subfocoplanes') subfocoplanes!: ElementRef;

  form:FormGroup = this.fb.group({
    textobuscar: [
      '',
      [Validators.required],
    ]
  });

  form2:FormGroup = this.fb.group({
    email: ['', [Validators.required,Validators.pattern(this.validacion.emailPattern)]]
  });

  constructor(
    private categoriasServices: CategoriasService,
    public DominiosService: DominiosService,
    private router: Router,
    private fb: FormBuilder,
    private validacion: ValidatorService,
  ) {
    let token = localStorage.getItem('token')!;
      let empresaselect = localStorage.getItem('empresaselect')!;

      if(token && empresaselect){
        this.logueado = true;
      }
  }

  ngOnInit(): void {

    this.loadingCategorias = true;

    let datosLogin = JSON.parse(localStorage.getItem('usuario')!);
    console.log(datosLogin);
    if(datosLogin){
      if(datosLogin.razonsocial){
        this.nombreUsuario = datosLogin.razonsocial;
      }else{
        this.nombreUsuario = datosLogin.nombre;
      }
      
    }


    this.lang = localStorage.getItem('lang') || 'es';

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
        this.loadingCategorias = false;
    });

      this.buscarsubcategoria(1);

    //limpiar variable de busqueda
    if (localStorage.getItem('resultados_busqueda')) {
      localStorage.removeItem('resultados_busqueda');
    }
    //actualizar n carrito
    this.itemsCarrito();

    let carrito = JSON.parse(localStorage.getItem('carrito')!);

    if (!carrito || carrito.length == 0) {
      this.margintop = 0;
    }else{
      this.margintop = 110;
    }


  }
  changeLang(data:any){
    localStorage.setItem('lang', data.value );

    window.location.reload();

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

    if (!carrito || carrito.length == 0) {
      this.DominiosService.totalCarro = 0;
    }else{
      this.DominiosService.totalCarro = carrito.length;
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

  insertNews(){

    if(this.form2.get('email')?.invalid){

      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Ingrese una dirección de correo válida.',
        showConfirmButton: false,
        timer: 2500,
        width: '350px',
        customClass: {
            popup: 'alerta'
          }
      })

    }else{

      let email = this.form2.value.email;

      this.data.email = email;

      this.categoriasServices.registrarnewsletter(this.data).subscribe((respuesta) => {
        console.log(respuesta);

        if(respuesta==1){

            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Su correo ha sido registrado en nuestro sistema',
              showConfirmButton: false,
              timer: 2500,
              width: '350px',
              customClass: {
                  popup: 'alerta'
                }
            })

            this.data = {
              email:''
            }
            this.form2.reset(this.data);

          }
        })

    }

    return;
    
    

  }


}
