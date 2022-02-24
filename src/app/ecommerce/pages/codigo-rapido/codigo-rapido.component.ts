import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriasService } from '../../services/categorias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-codigo-rapido',
  templateUrl: './codigo-rapido.component.html',
  styleUrls: ['./codigo-rapido.component.css']
})
export class CodigoRapidoComponent implements OnInit {

  correo: string = '';

  form: FormGroup = this.fb.group({
    code: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private categoriasService: CategoriasService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    let usuario = JSON.parse(localStorage.getItem('usuario')!);

    if(!usuario){
      this.router.navigate(['/']);
    }

    this.correo = usuario.email;
  }

  continuar(){

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    let usuario = JSON.parse(localStorage.getItem('usuario')!);

    let data = {
      email: usuario.email,
      code: this.form.value.code,
    };

    this.categoriasService.logincode(data).subscribe((resp) => {
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
            title: 'Codigo incorrecto',
            showConfirmButton: false,
            timer: 1500
          })
        }
      }else{

        Swal.fire({
          icon: 'error',
          title: 'Codigo incorrecto',
          showConfirmButton: false,
          timer: 1500
        })

      }
    });

  }

}
