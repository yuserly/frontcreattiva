import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriasService } from '../../services/categorias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-password',
  templateUrl: './login-password.component.html',
  styleUrls: ['./login-password.component.css'],
})
export class LoginPasswordComponent implements OnInit {
  nombre: string = '';

  btn_codrapido:boolean = false;

  form: FormGroup = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private categoriasService: CategoriasService,
    private router: Router,
    private fb: FormBuilder
  ) {}
  hide: boolean = true;
  ngOnInit(): void {
    let usuario = JSON.parse(localStorage.getItem('usuario')!);
    let token = localStorage.getItem('token')!;
    let empresaselect = localStorage.getItem('empresaselect')!;

    if(token && empresaselect){
      this.router.navigate(['/facturacion']);
    }

    this.nombre = usuario.nombre;
  }

  continuar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    let usuario = JSON.parse(localStorage.getItem('usuario')!);

    let data = {
      email: usuario.email,
      password: this.form.value.password,
    };

    this.categoriasService.login(data).subscribe((resp) => {
      console.log(resp);

      if (resp.data) {
        if (resp.data.token) {
          if (resp.data.empresas.lenght > 1) {
            localStorage.setItem('token', resp.data.token);
            this.router.navigate(['/seleccionar-empresa']);
          } else {
            localStorage.setItem('token', resp.data.token);
            localStorage.setItem(
              'empresaselect',
              resp.data.empresas[0]['id_empresa']
            );
            this.router.navigate(['/facturacion']);
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

  solicitudcode(){

    this.btn_codrapido = true;

    let usuario = JSON.parse(localStorage.getItem('usuario')!);

    let data = {
      email: usuario.email
    };
    this.categoriasService.solicitudcode(data).subscribe(resp =>{
      if(resp.data){
        if(resp.data.ok){
          this.btn_codrapido = false;
          this.router.navigate(['/codigo-rapido']);
        }else{

          const title = resp.message;

          Swal.fire({
            icon: 'error',
            title: title,
            showConfirmButton: false,
            timer: 1500
          })
        }
      }else{
        const title = resp.message;
          Swal.fire({
            icon: 'error',
            title: title,
            showConfirmButton: false,
            timer: 1500
          })
      }
    });
  }
}
