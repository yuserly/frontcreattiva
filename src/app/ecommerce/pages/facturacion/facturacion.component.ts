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


  form: FormGroup = this.fb.group({
    nombre: [
      '',
      [Validators.required, Validators.pattern(this.validacion.nombrePattern)],
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
    pais: ['', [Validators.required]],
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

  get mensajeerroremail(): string {
    const error = this.form.get('email')?.errors;

    if (error?.required) {
      return 'El email es requerido';
    } else if (error?.pattern) {
      return 'Debe ingresar un email valido';
    }

    return '';
  }
  get mensajeerrortelefonoempresa(): string {
    const error = this.form.get('telefonoempresa')?.errors;

    if (error?.required) {
      return 'El telefono de empresa es requerido';
    } else if (error?.pattern) {
      return 'Debe ingresar un telefono de empresa valido';
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
  options={
    componentRestrictions:{
      country:["CL"]
    }
  }

  constructor(
    private fb: FormBuilder,
    private validacion: ValidatorService,
    private CategoriasService: CategoriasService,
    private router: Router
  ) {}

  ngOnInit(): void {
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
      this.paises = resp;
    });

    this.CategoriasService.getRegiones().subscribe((resp) => {
      console.log(resp);
      this.regiones = resp;
    });

    let usuario = JSON.parse(localStorage.getItem('usuario')!);
    let token = localStorage.getItem('token')!;
    let empresaselect = parseInt(localStorage.getItem('empresaselect')!);

    if(empresaselect){

      this.CategoriasService.getempresaxid(empresaselect).subscribe((resp) => {
        console.log(resp);

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
            this.seleccion.mediopago = 1;

            if (resp.data.razonsocial) {
              this.nombrefacturacion = resp.data.razonsocial;
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
              }
            }

            if (resp.data.direccion && resp.data.region && resp.data.comuna) {
              this.datosdireccion = true;
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
        }

        this.form.reset(this.seleccion);

        // if (this.form.value.comuna != 0) {
        //   this.buscarcomuna();
        // }
      });

    }else{

          this.seleccion.nombre = usuario.nombre;
          this.seleccion.email = usuario.email;
          this.seleccion.pais = 'Chile';
          this.seleccion.isempresa = true;
          this.form.reset(this.seleccion);
    }

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
    if (
      !this.form.get('email')?.errors &&
      !this.form.get('telefono')?.errors &&
      !this.form.get('pais')?.errors
    ) {
      this.CategoriasService.crearempresa(this.form.value).subscribe((resp) => {
        console.log(resp);
        this.datoscompradorsave = true;
      });
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
      if (
        !this.form.get('rut')?.errors &&
        this.form.value.razonsocial != '' &&
        this.form.value.giro != '' &&
        !this.form.get('telefonoempresa')?.errors &&
        !this.form.get('emailempresa')?.errors
      ) {
        this.CategoriasService.crearempresa(this.form.value).subscribe(
          (resp) => {
            console.log(resp);
            this.datosfacturacion = true;
          }
        );
      } else {
        // this.form.markAllAsTouched()
      }
    } else {
      if (
        !this.form.get('rut')?.errors &&
        !this.form.get('telefonoempresa')?.errors &&
        !this.form.get('emailempresa')?.errors
      ) {
        this.CategoriasService.crearempresa(this.form.value).subscribe(
          (resp) => {
            console.log(resp);
            this.datosfacturacion = true;
          }
        );
      } else {
        // this.form.markAllAsTouched()
      }
    }
  }
  guardardireccion() {
    if (
      !this.form.get('direccion')?.errors &&
      !this.form.get('region')?.errors &&
      !this.form.get('comuna')?.errors
    ) {
      this.CategoriasService.crearempresa(this.form.value).subscribe((resp) => {
        console.log(resp);
        this.datosdireccion = true;
      });
    }
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
          console.log(resp);
          localStorage.setItem('infopago', JSON.stringify(resp));
          this.router.navigate(['/formulario-pago']);
        });
      }
    } else {
      if (!this.form.invalid) {
        let data = {
          datos: this.form.value,
          carro: JSON.parse(localStorage.getItem('carrito')!),
        };

        this.CategoriasService.generarordencompra(data).subscribe((resp) => {
          console.log(resp);
          localStorage.setItem('infopago', JSON.stringify(resp));
          this.router.navigate(['/formulario-pago']);
        });
      }
    }
  }

  AddressChange(address: any) {
    //setting address from API to local variable
    //  this.form.value.direccion=address.formatted_address

    console.log(address);

    this.form.get('direccion')!.setValue(`${address.address_components[1].long_name} ${address.address_components[0].long_name}`);
    this.form.get('region')!.setValue(address.address_components[5].long_name)
    this.form.get('comuna')!.setValue(address.address_components[3].long_name)
  }
}
