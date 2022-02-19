import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorService } from '../../../shared/validator/validator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {



  form:FormGroup = this.fb.group({
    nombre:['',[Validators.required]],
    email:['',[Validators.required, Validators.pattern(this.validacion.emailPattern)]]
  })

  get mensajeerroremail(): string
 {
   const error = this.form.get('email')?.errors;

   if(error?.required){
    return 'El email es requerido';
   }else if(error?.pattern){
    return 'Debe ingresar un email valido';
   }

   return '';
 }

 get mensajeerrornombre(): string
 {
   const error = this.form.get('nombre')?.errors;

   if(error?.required){
    return 'El nombre es requerido';
   }else if(error?.pattern){
    return 'Debe ingresar un nombre y apellido';
   }

   return '';
 }

  constructor( private fb: FormBuilder, private validacion: ValidatorService, private router: Router) { }

  ngOnInit(): void {

    let usuario = JSON.parse(localStorage.getItem('usuario')!);

    if(usuario || usuario.length > 0){
      this.router.navigate(['/facturacion']);
    }
  }

  continuar(){

    if(this.form.invalid){
      this.form.markAllAsTouched()
      return;
    }

    localStorage.setItem('usuario', JSON.stringify(this.form.value))

    this.router.navigate(['/facturacion']);
  }

  validarcampo(campo:string){
    return this.form.get(campo)?.invalid && this.form.get(campo)?.touched;
  }

}
