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
  selector: 'app-postulacion',
  templateUrl: './postulacion.component.html'
})
export class PostulacionComponent implements OnInit {

  data = {
    nombre: '',
    telefono:'',
    email:'',
    cargo:''
  }

  FilePDF?:FormData;

  errorPDF:boolean = false;

  form: FormGroup = this.fb.group({
    nombre: ['', [Validators.required,Validators.pattern(this.validacion.nombreUsuarioPattern)]],
    email: ['', [Validators.required,Validators.pattern(this.validacion.emailPattern)]],
    telefono: ['', [Validators.required,Validators.pattern(this.validacion.telefonoPattern)]],
    cargo: ['', Validators.required]
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

  constructor( private categoriasServices: CategoriasService,
    private router: Router,
    private fb: FormBuilder,
    private validacion: ValidatorService) { }

  ngOnInit(): void {
  }

  enviar(){

    if(!this.FilePDF){
      this.errorPDF = true;
      return;
    }

    if(this.form.invalid){
      this.form.markAllAsTouched()
      return;
    }

    this.btnCargando = true;

    this.data.nombre = this.form.value.nombre;
    this.data.email = this.form.value.email;
    this.data.telefono = this.form.value.telefono;
    this.data.cargo = this.form.value.cargo;
    let FilePdf = new FormData();
    if(this.FilePDF){
      FilePdf = this.FilePDF;
    }

    this.categoriasServices.registrarpostulacion(this.data).subscribe((respuesta) => {

      if(respuesta==1){

        this.btnCargando = false;
        this.mensajeEnviado = true;

        this.data = {
          nombre: '',
          telefono:'',
          email:'',
          cargo:''
        }
        this.form.reset(this.data);

        //guardar pdf
        this.categoriasServices.registrarpdfpostulacion(FilePdf).subscribe((respuesta) => {

          console.log(respuesta);

        })


      }

      
    });

  }

  adjuntarpdf(event:any):any{
    const cvadjunto = event.target.files[0];
    const formFile = new FormData();
    formFile.append('pdf',cvadjunto);
    this.FilePDF = formFile;

    // this.categoriasServices.registrarpostulacion(this.FilePDF).subscribe((respuesta) => {
      
    //   console.log("Datos del form");
    //   console.log(respuesta);

      
    // });

    //console.log(this.data.cv);

    
    //console.log(event.target.files);
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
