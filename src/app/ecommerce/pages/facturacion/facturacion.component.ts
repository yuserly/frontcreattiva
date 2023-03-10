import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from '../../../shared/validator/validator.service';
import { CategoriasService } from '../../services/categorias.service';
import { Paises } from '../../interfaces/paises.interfaces';
import Swal from 'sweetalert2';
import {
  TotalCarro,
  Regiones,
  Comunas,
} from '../../interfaces/ecommerce.interface';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css'],
})
export class FacturacionComponent implements OnInit {

  // @ViewChild('modalv') modal!: ElementRef;
  totalcarroarray!: TotalCarro;
  paises: Paises[] = [];
  regiones: Regiones[] = [];
  comunas: Comunas[] = [];
  datoscompradorsave: boolean = false;
  datosfacturacion: boolean = false;
  datosdireccion: boolean = false;
  nombrefacturacion: string = '';
  empresadatos:boolean = true;
  existedireccion:boolean = false;
  mostrarBtnComprarMovil:boolean = true;
  aplicarCupon:number = 1;
  tienerut:boolean = true;
  creandocompra:boolean = false;
  tieneregoneclick :boolean = false;
  nrotarjeta:string = '';
  contador:number = 8;
  contador2:number = 8;
  btnCargando:boolean = false;
  camposdireccionmodal:boolean = false;

  // informacion necesaria para ir a pagos

  metodopago:any = '';
  urlpago: any = '';
  token:any = '';

  @ViewChild('btncerrarmodal',{static:true}) btncerrarmodal!: ElementRef<HTMLFormElement>;


  // fomulario

  form: FormGroup = this.fb.group({
    nombre: [
      '',
      [Validators.required],
    ],
    email: [
      '',
      [Validators.required, Validators.pattern(this.validacion.emailPattern)],
    ],
    telefono: [
      '',
      [
        Validators.required,
        Validators.pattern(this.validacion.telefonoPattern),
      ],
    ],
    pais: ['Chile', [Validators.required]],
    rut: ['', [Validators.required, this.validacion.validarRut]],
    razonsocial: [''],
    giro: [''],
    telefonoempresa: [
      '',
      [
        Validators.required,
        Validators.pattern(this.validacion.telefonoPattern),
      ],
    ],
    emailempresa: [
      '',
      [Validators.required, Validators.pattern(this.validacion.emailPattern)],
    ],
    isempresa: [true, Validators.required],
    direccion: ['', [Validators.required]],
    numerodireccion: ['', [Validators.required]],
    region: ['', [Validators.required, this.validacion.validarRegionComuna]],
    comuna: ['', [Validators.required, this.validacion.validarRegionComuna]],
    mediopago: [1, [Validators.required]],
  });

  seleccion = {
    nombre: '',
    email: '',
    telefono: '',
    pais: '',
    rut: '',
    razonsocial: '',
    giro: '',
    telefonoempresa: '',
    emailempresa: '',
    isempresa: true,
    direccion: '',
    numerodireccion: '',
    region: '',
    comuna: '',
    mediopago: 1,
  };

  get mensajeerrortelefono(): string {
    const error = this.form.get('telefono')?.errors;

    if (error?.required) {
      return 'El telefono es requerido';
    } else if (error?.pattern) {
      return 'Debe ingresar un telefono valido';
    }

    return '';
  }

  get mensajeerrorrazonsocial(): string {
    const error = this.form.get('razonsocial')?.errors;

    if (error?.required) {
      return 'La razón social es requerida';
    } else if (error?.pattern) {
      return 'Debe ingresar una razón social válida';
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

  get mensajeerroremail(): string {
    const error = this.form.get('email')?.errors;

    if (error?.required) {
      return 'El email es requerido';
    } else if (error?.pattern) {
      return 'Debe ingresar un email válido';
    }

    return '';
  }
  get mensajeerrortelefonoempresa(): string {
    const error = this.form.get('telefonoempresa')?.errors;

    if (error?.required) {
      return 'El telefono de empresa es requerido';
    } else if (error?.pattern) {
      return 'Debe ingresar un telefono de empresa válido';
    }

    return '';
  }
  get mensajeerroremailempresa(): string {
    const error = this.form.get('emailempresa')?.errors;

    if (error?.required) {
      return 'El email de empresa es requerido';
    } else if (error?.pattern) {
      return 'Debe ingresar un email de empresa valido';
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

  get mensajeerrornumerodireccion(): string {
    const error = this.form.get('numerodireccion')?.errors;

    if (error?.required) {
      return 'El número es requerido';
    } else if (error?.pattern) {
      return 'Debe ingresar un número válido';
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

  // google

  formattedaddress=" ";
  options: Options={
    types: [],
    fields:['ALL'],
    strictBounds: false,
    componentRestrictions:{
      country:"cl"
    }
  }

  constructor(
    private fb: FormBuilder,
    private validacion: ValidatorService,
    private CategoriasService: CategoriasService,
    private router: Router
  ) {
    let config = this.CategoriasService.validarconfigcarro()

    if(config.config){
      localStorage.setItem('index', JSON.stringify(config.index[0]));
      let comprasucursal = localStorage.getItem('comprasucursal');

            if(comprasucursal){

              this.router.navigate(['sucursal/configuracion']);
            }else{
              this.router.navigate(['/configuracion']);

            }
    }



  }

  ngOnInit(): void {

    this.form.markAllAsTouched()

    let infopago = JSON.parse(localStorage.getItem('infopago')!);

    let carrito = JSON.parse(localStorage.getItem('carrito')!);

    if (!carrito || carrito.length == 0) {
      this.router.navigate(['/']);
    }

    if (infopago) {
      localStorage.removeItem('carrito');
      localStorage.removeItem('index');
      localStorage.removeItem('infopago');

      // debe llevar a la sucursal, si existe infopago quiere decir que hubo un intento de finalizar compra y se crearon los servicios
      this.router.navigate(['/']);

      return;
    }

    this.totalcarroarray = this.CategoriasService.calculototalcarro();

    this.CategoriasService.getpaises().subscribe((resp) => {

      let paisesall:any = [];

      resp.forEach((element) => {

        paisesall.push(element.name.common);

      })

      //this.paises = resp;
      this.paises = paisesall.sort();




    });

    this.CategoriasService.getRegiones().subscribe((resp) => {

      this.regiones = resp;
    });

    let usuario = JSON.parse(localStorage.getItem('usuario')!);
    let token = localStorage.getItem('token')!;
    let empresaselect = parseInt(localStorage.getItem('empresaselect')!);

    if(empresaselect){

      this.CategoriasService.getempresaxid(empresaselect).subscribe((resp) => {


        this.datosdelcliente(resp);
      });

    }else{

      this.CategoriasService.getempresa(usuario.email).subscribe((resp) => {


        this.datosdelcliente(resp);
      });
    }

  }

  datosdelcliente(resp:any){
    let usuario = JSON.parse(localStorage.getItem('usuario')!);
    let token = localStorage.getItem('token')!;
    let empresaselect = parseInt(localStorage.getItem('empresaselect')!);

    if (resp.data) {
      if (token && empresaselect) {
        this.seleccion.nombre = resp.data.nombre;
        this.seleccion.email = resp.data.email;
        this.seleccion.telefono = resp.data.telefono;
        this.seleccion.pais = resp.data.pais;
        this.seleccion.rut = resp.data.rut;
        this.seleccion.razonsocial = resp.data.razonsocial;
        this.seleccion.giro = resp.data.giro;
        this.seleccion.telefonoempresa = resp.data.telefono_empresa;
        this.seleccion.emailempresa = resp.data.email_empresa;


        if(resp.data.user){

          if(resp.data.user.tbktarjeta){
            this.seleccion.mediopago = 4;
            this.nrotarjeta = resp.data.user.tbktarjeta;
            this.tieneregoneclick = true;
          }else{
            this.seleccion.mediopago = 1;
          }

        }else{
          this.seleccion.mediopago = 1;
        }

        if (resp.data.razonsocial) {
          this.nombrefacturacion = resp.data.razonsocial;
        }

        if(resp.data.pais=='Chile'){
          this.tienerut = true;
        }else{
          this.tienerut = false;
        }

        if (resp.data.tipo == 1) {
          this.seleccion.isempresa = true;
          this.empresadatos = true;
        } else {
          this.seleccion.isempresa = false;
          this.empresadatos = false;

        }
        this.seleccion.direccion = resp.data.direccion;
        this.seleccion.region = resp.data.region;
        this.seleccion.comuna = resp.data.comuna;
        this.seleccion.numerodireccion = resp.data.numerodireccion;

        if (resp.data.nombre && resp.data.email && resp.data.telefono) {
          this.datoscompradorsave = true;
        }

        if (resp.data.tipo == 1) {
          if (
            resp.data.rut &&
            resp.data.razonsocial &&
            resp.data.giro &&
            resp.data.telefono_empresa &&
            resp.data.email_empresa
          ) {
            this.datosfacturacion = true;
          }
        } else {
          if (
            resp.data.rut &&
            resp.data.telefono_empresa &&
            resp.data.email_empresa
          ) {
            this.datosfacturacion = true;
            this.nombrefacturacion = resp.data.rut;
          }
        }

        if (resp.data.direccion && resp.data.region && resp.data.comuna) {
          this.datosdireccion = true;
          this.existedireccion = true;
        }
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('empresaselect');

        this.router.navigate(['/login']);
      }
    } else {
      this.seleccion.nombre = usuario.nombre;
      this.seleccion.email = usuario.email;
      this.seleccion.pais = 'Chile';
      this.seleccion.isempresa = true;
      this.tieneregoneclick = false;
    }

    this.form.reset(this.seleccion);

  }

  validarcampo(campo: string) {
    return this.form.get(campo)?.invalid && this.form.get(campo)?.touched;
  }

  buscarcomuna() {
    if (this.form.value.region != 0) {
      this.CategoriasService.getComunas(this.form.value.region).subscribe(
        (resp) => {
          this.comunas = resp;
        }
      );
    }
  }

  guardarcomprador() {
    this.btnCargando = true;

    if (
      !this.form.get('email')?.errors &&
      !this.form.get('telefono')?.errors &&
      !this.form.get('pais')?.errors
    ) {

      if(this.form.value.pais=='Chile'){
        this.tienerut = true;
      }else{
        this.tienerut = false;
      }

      this.CategoriasService.crearempresa(this.form.value).subscribe((resp) => {

        this.datoscompradorsave = true;
            this.btnCargando = false;
      });
    }else{
      this.form.markAllAsTouched();
      this.btnCargando = false;
    }
  }

  validarrut(){

    if(!this.form.get('rut')?.errors){

        let data = {
          rut: this.form.value.rut
        }

        this.CategoriasService.validarrut(data).subscribe(resp =>{
          console.log(resp)

          if(resp.data){

            Swal.fire({
              title: 'RUT en uso',
              text: "Este RUT ya se encuentra en uso ¿Quieres iniciar sesión?",
              icon: 'info',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Login',
              cancelButtonText: 'Cancelar',
              allowOutsideClick: false
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/login']);
              }else{
                this.ngOnInit();
              }
            })

          }

        })
    }
  }

  guardarfacturacion() {

    if (this.form.value.razonsocial != '') {
      this.nombrefacturacion = this.form.value.razonsocial;
    } else {
      this.nombrefacturacion = this.form.value.nombre;
    }

    if (this.form.value.isempresa) {

      if(this.tienerut){ //si tiene rut

        if (
          !this.form.get('rut')?.errors &&
          this.form.value.razonsocial != '' &&
          this.form.value.giro != '' &&
          !this.form.get('telefonoempresa')?.errors &&
          !this.form.get('emailempresa')?.errors
        ) {

          this.btnCargando = true;

          this.CategoriasService.crearempresa(this.form.value).subscribe(
            (resp) => {

              this.datosfacturacion = true;
              this.btnCargando = false;
            }
          );
        } else {
          this.form.markAllAsTouched();
          this.btnCargando = false;
        }


      }else{

        if (
          this.form.value.razonsocial != '' &&
          this.form.value.giro != '' &&
          !this.form.get('telefonoempresa')?.errors &&
          !this.form.get('emailempresa')?.errors
        ) {

          this.btnCargando = true;

          this.CategoriasService.crearempresa(this.form.value).subscribe(
            (resp) => {

              this.datosfacturacion = true;
              this.btnCargando = false;
            }
          );
        } else {
          this.form.markAllAsTouched();
          this.btnCargando = false;
        }

      }

    } else {

      if(this.tienerut){ //si tiene rut

        if (
          !this.form.get('rut')?.errors &&
          !this.form.get('telefonoempresa')?.errors &&
          !this.form.get('emailempresa')?.errors
        ) {
          this.btnCargando = true;
          this.CategoriasService.crearempresa(this.form.value).subscribe(
            (resp) => {

              this.datosfacturacion = true;
              this.btnCargando = false;
            }
          );
        } else {
          // this.form.markAllAsTouched()
        }

      }else{

        if (
          !this.form.get('telefonoempresa')?.errors &&
          !this.form.get('emailempresa')?.errors
        ) {
          this.btnCargando = true;
          this.CategoriasService.crearempresa(this.form.value).subscribe(
            (resp) => {

              this.datosfacturacion = true;
              this.btnCargando = false;
            }
          );
        } else {
          // this.form.markAllAsTouched()
          this.btnCargando = false;
        }

      }

    }
  }
  guardardireccion() {

    if (
      !this.form.get('direccion')?.errors &&
      !this.form.get('region')?.errors &&
      !this.form.get('comuna')?.errors &&
      !this.form.get('numerodireccion')?.errors
    ) {
      this.CategoriasService.crearempresa(this.form.value).subscribe((resp) => {

        this.btncerrarmodal.nativeElement.click();

        this.datosdireccion = true;
        this.existedireccion = true;
        this.camposdireccionmodal = false;
      });
    }else{

      this.camposdireccionmodal = true;

    }

    console.log(this.form);
  }

  modificardatoscomprador() {
    this.datoscompradorsave = false;
  }

  modificarfacturacion() {
    this.datosfacturacion = false;
  }

  modificardireccion() {
    this.datosdireccion = false;
  }

  mostrardatosempresa(){
    this.empresadatos = this.form.value.isempresa;
  }


  finalizarcompra() {

    if (this.form.value.isempresa == 1) {
      this.creandocompra = true;
      if (
        !this.form.invalid &&
        this.form.value.razonsocial != '' &&
        this.form.value.giro != ''
      ) {
        let data = {
          datos: this.form.value,
          carro: JSON.parse(localStorage.getItem('carrito')!),
        };

        this.CategoriasService.generarordencompra(data).subscribe((resp) => {

          if(resp){

            if(resp.metodopago == 3 || resp.metodopago == '3'){

              this.router.navigate(['/pago-transferencia']);

            }

            if((resp.metodopago == 4 || resp.metodopago == '4') && resp.pagoexitoso == 1 ){

              this.router.navigate(['/pago-exitoso']);

            }

            this.metodopago = resp.metodopago;

            this.urlpago = resp.url;

            this.token = resp.token;

            this.ejecutarformpago();



          }

          // localStorage.setItem('infopago', JSON.stringify(resp));
          // this.router.navigate(['/formulario-pago']);
        });


      }
    } else {

      if (!this.form.invalid) {

        console.log("El formulario es valido");

        this.creandocompra = true;

        let data = {
          datos: this.form.value,
          carro: JSON.parse(localStorage.getItem('carrito')!),
        };

        this.CategoriasService.generarordencompra(data).subscribe((resp) => {

          console.log(resp);

          if(resp){

            if(resp.metodopago == 3 || resp.metodopago == '3'){

              this.router.navigate(['/pago-transferencia']);

            }

            if((resp.metodopago == 4 || resp.metodopago == '4') && resp.pagoexitoso == 1 ){

              this.router.navigate(['/pago-exitoso']);

            }

            this.metodopago = resp.metodopago;

            this.urlpago = resp.url;

            this.token = resp.token;

            this.ejecutarformpago();


          }

          // localStorage.setItem('infopago', JSON.stringify(resp));
          // this.router.navigate(['/formulario-pago']);
        });

      }else{

        console.log("Formulario invalido");

      }
    }
  }

  ejecutarformpago(){

    console.log(this.metodopago, this.urlpago, this.token);


    if(this.metodopago == 4 || this.metodopago == '4'){

      // window.location.href  = "http://backendcreattiva.cp/pago/oneclick/"+this.token;
      window.location.href  = "https://app.t2.creattivadatacenter.com/pago/oneclick/"+this.token;
    }

    if(this.metodopago == 1 || this.metodopago == '1'){
      // window.location.href  = "http://backendcreattiva.cp/pago/webpayplus/"+this.token;
      window.location.href  = "https://app.t2.creattivadatacenter.com/pago/webpayplus/"+this.token;


    }

    if(this.metodopago == 2 || this.metodopago == '2'){
      window.location.href  = this.urlpago;
    }
  }

  AddressChange(address: any) {
    //setting address from API to local variable
    //  this.form.value.direccion=address.formatted_address

    console.log("Resultado de la dirección: ");

    console.log(address);

    this.form.get('direccion')!.setValue(`${address.address_components[1].long_name} ${address.address_components[0].long_name}`);
    if(address.address_components[0].types=='street_number'){
      this.form.get('numerodireccion')!.setValue(address.address_components[0].long_name);
    }
    this.form.get('region')!.setValue(address.address_components[5].long_name)
    this.form.get('comuna')!.setValue(address.address_components[3].long_name)
  }

  ValidarBtnComprarMovil(act:boolean){

    if(act){

      if(!this.form.invalid){

        this.finalizarcompra();
        console.log("Se ejecuto");

      }else{

        console.log("Formulario invalido");
        Swal.fire({
          position: 'center',
          title: '* Debes completar todos los campos en el formulario',
          showConfirmButton: false,
          showCancelButton: false,
          width: '350px',
          customClass: {
              popup: 'alerta'
            },
          timer: 2500
        })

      }

    }

  }

  validarcaracteres(event: any, opc:number){
    
    let ExpRegSoloNumeros="^[0-9]+$";

    if(opc==1){

      this.contador = 8 - event.target.value.length;
      let tele = this.form.value.telefono;
      
      //Evaluación de Cadena Valida de Solo Números 
      if(tele.match(ExpRegSoloNumeros)==null){
        this.seleccion.telefono = this.form.value.telefono;
        this.form.patchValue({telefono:''})
      }

    }else if(opc==2){

      this.contador2 = 8 - event.target.value.length;
      let tele = this.form.value.telefonoempresa;
      
      //Evaluación de Cadena Valida de Solo Números 
      if(tele.match(ExpRegSoloNumeros)==null){
        this.seleccion.telefonoempresa = this.form.value.telefonoempresa;
        this.form.patchValue({telefonoempresa:''})
      }

    }

  }

}
