import { BoundElementProperty } from '@angular/compiler';
import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Productos, Carrito, Periodo } from '../../interfaces/ecommerce.interface';
import { CategoriasService } from '../../services/categorias.service';
import { PeriodoComponent } from '../periodo/periodo.component';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ValidatorService } from '../../../shared/validator/validator.service';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styles: [],
})
export class PlanesComponent implements OnInit {

  @ViewChild(PeriodoComponent) PeriodoView!: PeriodoComponent;

  @Input() productos!: Productos[];
  @Input() resultadobusqueda!: boolean;

  productosbuscadosarray!: Productos[];

  paso1_eco:boolean = true;
  paso2_eco:boolean = false;
  paso3_eco:boolean = false;
  validarperiodos:boolean = false;
  contador:number = 8;

  periodos_ecommerce:Periodo[] = [];

  validar = {

    email: false,
    nombretienda: false,
    telefono: false,
    nombre: false,
    tipocontrato:false,
    rut:false,
    giro:false,
    direccion:false

  }

  data = {
    email: '',
    nombretienda: '',
    telefono: '',
    nombre: '',
    tipocontrato:'',
    periodo_select:'',
    rut:'',
    giro:'',
    direccion:'',
    idproducto:0
  }

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.validacion.emailPattern)]],
    nombretienda: ['', [Validators.required, Validators.pattern(this.validacion.nombreTienda)]],
    telefono: ['', [Validators.required,Validators.pattern(this.validacion.telefonoPattern)]],
    nombre: ['', [Validators.required, Validators.pattern(this.validacion.nombreUsuarioPattern)]],
    tipocontrato: ['', [Validators.required]],
    periodo_select: ['', [Validators.required]],
    rut: ['', [Validators.required]],
    giro: ['', [Validators.required]],
    direccion: ['', [Validators.required]]
  });

  get mensajeerroremail(): string {
    const error = this.form.get('email')?.errors;

    if (error?.required) {
      return 'El email es requerido';
    } else if (error?.pattern) {
      return 'Debe ingresar un email válido';
    }

    return '';
  }

  get mensajeerrortelefono(): string {
    const error = this.form.get('telefono')?.errors;

    if (error?.required) {
      return 'El telefono es requerido';
    } else if (error?.pattern) {
      return 'Debe ingresar un telefono válido';
    }

    return '';
  }

  get mensajeerrornombre(): string {
    const error = this.form.get('nombre')?.errors;

    if (error?.required) {
      return 'El nombre es requerido';
    } else if (error?.pattern) {
      return 'Debe ingresar un nombre válido';
    }

    return '';
  }

  get mensajeerrordireccion(): string {
    const error = this.form.get('direccion')?.errors;

    if (error?.required) {
      return 'La dirección es requerida';
    } else if (error?.pattern) {
      return 'Debe ingresar una direccion valida';
    }

    return '';
  }

  get mensajeerrorrut(): string {
    const error = this.form.get('rut')?.errors;

    if (error?.required) {
      return 'El rut es requerido';
    } else if (error?.errorrut) {
      return 'Debe ingresar un rut valido';
    }

    return '';
  }

  get mensajeerrorgiro(): string {
    const error = this.form.get('giro')?.errors;

    if (error?.required) {
      return 'El giro es requerido';
    } else if (error?.pattern) {
      return 'Debe ingresar un giro válido';
    }

    return '';
  }

  get mensajeerrortipocontrato(): string {

      return 'Debes seleccionar como deseas contratar';

  }

  get mensajeerrorperiodo(): string {

    return 'Debes seleccionar un periodo';

}

  get mensajeerrornombretienda(): string {
    const error = this.form.get('nombretienda')?.errors;

    if (error?.required) {
      return 'El nombre es requerido';
    } else if (error?.pattern) {
      return 'Debe ingresar un nombre válido';
    }

    return '';
  }

  owl_planes: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  constructor(
    private router: Router,
    private categoriasServices: CategoriasService,
    private fb: FormBuilder,
    private validacion: ValidatorService
  ) {}

  ngOnInit(): void {}

  buscarproducto(id: number) {
    this.categoriasServices.getproductos(id).subscribe((productos) => {
      this.productos = productos;
    });
  }

  contratar(producto: Productos) {

    if (localStorage.getItem('carrito')) {
      let carro: Carrito[] = JSON.parse(localStorage.getItem('carrito')!);

      this.aggcart(producto, carro);


    } else {
      let carro: Carrito[] = [];

      this.aggcart(producto, carro);
    }
    
  }

  aggcart(producto: Productos,  carro: Carrito[]){

    this.registroDetallesCarrito(producto); //registro en tabla registrosCarrito

      let periodoselect = 1;

          this.categoriasServices
            .getperiodos(producto.id_producto)
            .subscribe((resp2) => {

              /*
              resp2.forEach((element) => {
                if(element.preseleccionado==1){
                  periodoselect = element.id_periodo;
                }

              });*/

              periodoselect = producto.subcategoria.preseleccionado;

              carro.push({
                producto: producto,
                periodo: periodoselect,
                dominio: '',
                sistemaoperativo: 0,
                versionsistema: 0,
                administrar: 0,
                ip: '',
                periodos: resp2,
                cantidad: 1,
                cupon_descuento: 0,
              });

              const cantidadcarro = carro.length;
              const index = cantidadcarro - 1;

              localStorage.setItem('index', JSON.stringify(index));
              localStorage.setItem('carrito', JSON.stringify(carro));

              let comprasucursal = localStorage.getItem('comprasucursal');

              if(comprasucursal){

                this.router.navigate(['sucursal/configuracion']);
              }else{
                this.router.navigate(['/configuracion']);

              }

            });

  }

  productosp(productosb:Productos[]){

    this.productosbuscadosarray = productosb;
    console.log("datos obtenidos por emit");
    console.log(this.productosbuscadosarray);

    if (localStorage.getItem('resultados_busqueda')) {

      localStorage.setItem('resultados_busqueda', JSON.stringify(this.productosbuscadosarray));

    }

  }

  registroDetallesCarrito(data:any){

    let url = location.href;

    let usuario = JSON.parse(localStorage.getItem('usuario')!);

    let detallesAdicionales= [{
      "url":url,
      "usuario":usuario
    }];

    let arrayInfo= [{
      "opc":'add',
      "data":data,
      "adicionales":detallesAdicionales
    }];

    this.categoriasServices
        .registrocarrito(arrayInfo)
        .subscribe((resp) => {
          console.log(resp);
        });

  }

  insertarEcommerce(pantalla:string){

    if(pantalla==='pantalla1'){

      this.data.email = this.form.value.email;
      this.data.nombretienda = this.form.value.nombretienda;
      this.data.telefono = this.form.value.telefono;
      this.data.periodo_select = this.form.value.periodo_select;

      if(this.data.email!=='' && this.data.nombretienda!=='' && this.data.telefono!=='' && this.data.periodo_select){

        this.paso1_eco = false;
        this.paso2_eco = true;
        this.paso3_eco = false;

        this.categoriasServices.registrarecommerce(this.data).subscribe((respuesta) => {
          console.log(respuesta);
        })

      }else{

        if(!this.validarcampo('email')){this.validar.email = true;}
        if(!this.validarcampo('nombretienda')){this.validar.nombretienda = true;}
        if(!this.validarcampo('telefono')){this.validar.telefono = true;}
        if(this.data.periodo_select===''){
          this.validarperiodos = true;
        }else{
          this.validarperiodos = false;
        }
        

      }

    }else if(pantalla==='pantalla2'){

      this.paso1_eco = false;
      this.paso2_eco = true;
      this.paso3_eco = false;

      this.data.nombre = this.form.value.nombre;
      this.data.tipocontrato = this.form.value.tipocontrato;
      this.data.rut = this.form.value.rut;
      this.data.giro = this.form.value.giro;
      this.data.direccion = this.form.value.direccion;

      if(this.data.nombre!=='' && 
         this.data.tipocontrato!=='' && 
         this.data.rut!=='' &&
         this.data.direccion!==''
      ){

        this.paso1_eco = false;
        this.paso2_eco = false;
        this.paso3_eco = true;

        this.categoriasServices.registrarecommerce(this.data).subscribe((respuesta) => {
          console.log(respuesta);
        })

      }else{

        if(!this.validarcampo('nombre')){this.validar.nombre = true;}
        if(!this.validarcampo('tipocontrato')){this.validar.tipocontrato = true;}else{this.validar.tipocontrato = false;}
        if(!this.validarcampo('rut')){this.validar.rut = true;}
        if(!this.validarcampo('direccion')){this.validar.direccion = true;}

      }

    }else if(pantalla==='pantalla3'){


      this.data = {
        email: '',
        nombretienda: '',
        telefono: '',
        nombre: '',
        tipocontrato:'',
        periodo_select:'',
        rut:'',
        giro:'',
        direccion:'',
        idproducto:0
      }

      this.validar = {

        email: false,
        nombretienda: false,
        telefono: false,
        nombre: false,
        tipocontrato:false,
        rut:false,
        giro:false,
        direccion:false
    
      }

      this.form.reset(this.data);
      this.paso1_eco = true;
      this.paso2_eco = false;
      this.paso3_eco = false;
      this.validarperiodos = false;
    }

  }

  contratarjumpseller(producto: Productos) {
    //asignar id producto
    this.data.idproducto = producto.id_producto;
    this.categoriasServices.getperiodos(this.data.idproducto).subscribe( resp => {

      this.periodos_ecommerce = resp;
      console.log(resp);


    })
  }

  validarcampo(campo: string) {
    if(campo=='tipocontrato'){
      if(this.form.value.tipocontrato===''){
        return false;
      }else{
        return true;
      }
      
    }else if(campo=='periodo'){

      if(this.form.value.periodo===''){
        return false;
      }else{
        return true;
      }

    }else{
      return this.form.get(campo)?.invalid && this.form.get(campo)?.touched;
    }
    
  }

  validarcaracteres(event: any){
    this.contador = 8 - event.target.value.length;
    let tele = this.form.value.telefono;


    let ExpRegSoloNumeros="^[0-9]+$";
    
    //Evaluación de Cadena Valida de Solo Números 
    if(tele.match(ExpRegSoloNumeros)==null){
      this.data.telefono = this.form.value.telefono;
      this.form.patchValue({telefono:''})
    }
      
  }

}
