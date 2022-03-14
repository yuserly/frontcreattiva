import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorService } from '../../../shared/validator/validator.service';
import { CategoriasService } from '../../../ecommerce/services/categorias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-sucursal',
  templateUrl: './login-sucursal.component.html',
  styleUrls: ['./login-sucursal.component.css']
})
export class LoginSucursalComponent implements OnInit {

  form: FormGroup = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(8)]],
    email: [
      '',
      [Validators.required, Validators.pattern(this.validacion.emailPattern)],
    ]
  });

  formpass: FormGroup = this.fb.group({
    emailpass: [
      '',
      [Validators.required, Validators.pattern(this.validacion.emailPattern)],
    ]
  });

  get mensajeerroremail(): string {
    const error = this.form.get('email')?.errors;

    if (error?.required) {
      return 'El email es requerido';
    } else if (error?.pattern) {
      return 'Debe ingresar un email valido';
    }

    return '';
  }

  hide: boolean = true;
  cargando:boolean = false;
  emailenviado:boolean = false;
  errormail:boolean = false;


  constructor(private fb: FormBuilder,
    private validacion: ValidatorService,
    private router: Router,
    private categoriasService: CategoriasService) {
      let token = localStorage.getItem('token')!;
      let empresaselect = localStorage.getItem('empresaselect')!;

      if(token && empresaselect){
        this.router.navigate(['/sucursal']);
      }else{
        localStorage.removeItem('token');
        localStorage.removeItem('empresaselect')
      }
    }

  ngOnInit(): void {

  }

  continuar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    let data = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.categoriasService.login(data).subscribe((resp) => {
      console.log(resp);

      if (resp.data) {

        if (resp.data.token) {


          if (resp.data.empresas.lenght > 1) {
            localStorage.setItem('token', resp.data.token);
            let usuario = {
              nombre: resp.data.empresas[0].nombre,
              email: resp.data.empresas[0].email
            }

            localStorage.setItem('usuario', JSON.stringify(usuario));

            this.router.navigate(['/seleccionar-empresa']);
          } else {
            localStorage.setItem('token', resp.data.token);
            let usuario = {
              nombre: resp.data.empresas[0].nombre,
              email: resp.data.empresas[0].email,
              razonsocial:resp.data.empresas[0].razonsocial
            }

            localStorage.setItem('usuario', JSON.stringify(usuario));
            localStorage.setItem(
              'empresaselect',
              resp.data.empresas[0]['id_empresa']
            );
            this.router.navigate(['/sucursal']);
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Contraseña incorrecta',
            showConfirmButton: false,
            timer: 1500
          })
        }
      }
    });
  }

  recuperar(){
    if (this.formpass.invalid) {
      this.formpass.markAllAsTouched();
      return;
    }

    this.cargando = true;

    this.categoriasService
      .recuperarpassword(this.formpass.value.emailpass)
      .subscribe((resp) => {

        console.log(resp)

        if (resp.data.ok) {
          this.emailenviado = true;
          this.cargando = false;
        } else {
          this.errormail = true;
          this.cargando = false;

        }

        console.log(this.cargando)
        console.log(this.errormail)
        console.log(this.emailenviado)


      });

  }

  validarcampo(campo: string) {
    return this.form.get(campo)?.invalid && this.form.get(campo)?.touched;
  }

}
