import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Categorias,
  Subcategorias,
  Carrito,
  Productos
} from '../../interfaces/ecommerce.interface';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriasService } from '../../services/categorias.service';
import { ValidatorService } from '../../../shared/validator/validator.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-contacto',
  templateUrl: './formulario-contacto.component.html'
})
export class FormularioContactoComponent implements OnInit {

  data = {
    nombre: '',
    telefono:'',
    email:'',
    mensaje:''
  }

  form: FormGroup = this.fb.group({
    nombre: ['', [Validators.required,Validators.pattern(this.validacion.nombreUsuarioPattern)]],
    email: ['', [Validators.required,Validators.pattern(this.validacion.emailPattern)]],
    telefono: ['', [Validators.required,Validators.pattern(this.validacion.telefonoPattern)]],
    mensaje: ['', Validators.required],
  });

  btnCargando:boolean = false;

  mensajeEnviado:boolean = false;

  contador:number = 8;
  
  get mensajeerroremail(): string {
    const error = this.form.get('email')?.errors;

    if (error?.required) {
      return 'El email es requerido';
    } else if (error?.pattern) {
      return 'Debe ingresar un email válido';
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

  get mensajeerrortelefono(): string {
    const error = this.form.get('telefono')?.errors;

    if (error?.required) {
      return 'El telefono es requerido';
    } else if (error?.pattern) {
      return 'Debe ingresar un telefono válido';
    }

    return '';
  }

  get mensajeerrormensaje(): string {
    const error = this.form.get('mensaje')?.errors;

    if (error?.required) {
      return 'El mensaje o consulta es requerido';
    }

    return '';
  }

  constructor(
    private categoriasServices: CategoriasService,
    private router: Router,
    private fb: FormBuilder,
    private validacion: ValidatorService,) 
    { }

  ngOnInit(): void {

    /*
    let data = {
      nombre: 'jesus',
      telefono:'999999',
      email:'jesus@creattiva.cl',
      mensaje:'holaaaa'
    }

    this.categoriasServices.registrarconsulta(data).subscribe((respuesta) => {
      console.log(respuesta);

      
    });*/

  }

  enviar(){
    if(this.form.invalid){
      this.form.markAllAsTouched()
      return;
    }

    this.btnCargando = true;

    this.data.nombre = this.form.value.nombre;
    this.data.email = this.form.value.email;
    this.data.telefono = this.form.value.telefono;
    this.data.mensaje = this.form.value.mensaje;

    this.categoriasServices.registrarconsulta(this.data).subscribe((respuesta) => {
      
      if(respuesta==1){

        this.btnCargando = false;
        this.mensajeEnviado = true;

        window.scroll(0,0);

        /*
        Swal.fire({
          position: 'center',
          title: 'Su consulta ha sido enviada',
          showConfirmButton: true,
          confirmButtonColor: '#005AD2',
          showCancelButton: false,
          confirmButtonText: 'Ok',
          width: '350px',
          customClass: {
              popup: 'alerta'
            }
        }).then((result) => {
         
        })
        */
        this.data = {
          nombre: '',
          telefono:'',
          email:'',
          mensaje:''
        }
        this.form.reset(this.data);

      }

      
    });

  }

  validarcampo(campo: string) {
    return this.form.get(campo)?.invalid && this.form.get(campo)?.touched;
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
