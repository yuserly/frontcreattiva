import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from '../../../shared/validator/validator.service';
import { CategoriasService } from '../../services/categorias.service';
import { Paises } from '../../interfaces/paises.interfaces';
import { TotalCarro } from '../../interfaces/ecommerce.interface';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css']
})
export class FacturacionComponent implements OnInit {
  totalcarroarray!: TotalCarro;
  paises: Paises[] = [];
  datoscompradorsave: boolean = false;
  datosfacturacion: boolean = false;
  datosdireccion: boolean = false;
  nombrefacturacion:string = 'Creattiva Datacenter'

  form:FormGroup = this.fb.group({
    nombre:['',[Validators.required, Validators.pattern(this.validacion.nombrePattern)]],
    email:['',[Validators.required, Validators.pattern(this.validacion.emailPattern)]],
    telefono:['', [Validators.required, Validators.pattern(this.validacion.telefonoPattern)]],
    pais:['',[Validators.required]],
    rut:['', [Validators.required, this.validacion.validarRut]],
    razonsocial: [''],
    giro:[''],
    telefonoempresa:['', [Validators.required, Validators.pattern(this.validacion.telefonoPattern)]],
    emailempresa:['',[Validators.required, Validators.pattern(this.validacion.emailPattern)]],
    isempresa:[true,Validators.required]
  })

  seleccion = {
    nombre:'',
    email:'',
    telefono:'',
    pais:'',
    rut: '',
    razonsocial: '',
    giro:'',
    telefonoempresa:'',
    emailempresa: '',
    isempresa:true

  }

  get mensajeerrortelefono(): string
 {
   const error = this.form.get('telefono')?.errors;

   if(error?.required){
    return 'El telefono es requerido';
   }else if(error?.pattern){
    return 'Debe ingresar un telefono valido';
   }

   return '';
 }
 get mensajeerrortelefonoempresa(): string
 {
   const error = this.form.get('telefonoempresa')?.errors;

   if(error?.required){
    return 'El telefono de empresa es requerido';
   }else if(error?.pattern){
    return 'Debe ingresar un telefono de empresa valido';
   }

   return '';
 }
 get mensajeerroremailempresa(): string
 {
   const error = this.form.get('emailempresa')?.errors;

   if(error?.required){
    return 'El email de empresa es requerido';
   }else if(error?.pattern){
    return 'Debe ingresar un email de empresa valido';
   }

   return '';
 }

 get mensajeerrorrut(): string
 {
   const error = this.form.get('rut')?.errors;

   if(error?.required){
    return 'El rut es requerido';
   }else if(error?.errorrut){
    return 'Debe ingresar un rut valido';
   }

   return '';
 }

  constructor(private fb: FormBuilder, private validacion: ValidatorService, private CategoriasService: CategoriasService) { }

  ngOnInit(): void {

    this.totalcarroarray = this.CategoriasService.calculototalcarro();

    this.CategoriasService.getpaises().subscribe(resp => {
      console.log(resp[0].name)
      this.paises = resp;
    })
    let usuario = JSON.parse(localStorage.getItem('usuario')!);
    this.seleccion.nombre = usuario.nombre;
    this.seleccion.email = usuario.email;
    this.seleccion.pais = 'Chile',
    this.seleccion.isempresa = true;

    this.form.reset(this.seleccion);


  }

  validarcampo(campo:string){
    return this.form.get(campo)?.invalid && this.form.get(campo)?.touched;
  }

  guardarcomprador(){
    this.datoscompradorsave = true;
    console.log(this.form.value)
  }

  guardarfacturacion(){
    this.datosfacturacion = true;
    if(this.form.value.razonsocial != ''){
    this.nombrefacturacion = this.form.value.razonsocial;
    }else{
      this.nombrefacturacion = this.form.value.nombre;
    }
  }

  modificardatoscomprador(){
    this.datoscompradorsave = false;
  }

  modificarfacturacion(){
    this.datosfacturacion = false;
  }

}
