import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorService } from '../../../shared/validator/validator.service';
import { CategoriasService } from '../../services/categorias.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  form: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    email: [
      '',
      [Validators.required, Validators.pattern(this.validacion.emailPattern)],
    ],
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

  get mensajeerrornombre(): string {
    const error = this.form.get('nombre')?.errors;

    if (error?.required) {
      return 'El nombre es requerido';
    } else if (error?.pattern) {
      return 'Debe ingresar un nombre y apellido';
    }

    return '';
  }

  constructor(
    private fb: FormBuilder,
    private validacion: ValidatorService,
    private router: Router,
    private categoriasService: CategoriasService
  ) {}

  ngOnInit(): void {
    let usuario = JSON.parse(localStorage.getItem('usuario')!);

    if (usuario) {
      this.categoriasService.getempresa(usuario.email).subscribe((resp) => {
        console.log(resp)
        if (resp.data) {
          this.router.navigate(['/login']);
        } else {
          this.router.navigate(['/facturacion']);
        }
      });
    }
  }

  continuar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    localStorage.setItem('usuario', JSON.stringify(this.form.value));

    this.categoriasService
      .getempresa(this.form.value.email)
      .subscribe((resp) => {

        if (resp.data) {
          this.router.navigate(['/login']);
        } else {
          this.router.navigate(['/facturacion']);
        }
      });

    // this.router.navigate(['/facturacion']);
  }

  validarcampo(campo: string) {
    return this.form.get(campo)?.invalid && this.form.get(campo)?.touched;
  }
}
