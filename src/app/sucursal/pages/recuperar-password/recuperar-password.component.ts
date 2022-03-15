import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SucursalService } from '../../services/sucursal.service';
import { switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent implements OnInit {

  form: FormGroup = this.fb.group({
    email: [''],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });
  hide: boolean = true;

  constructor(
    private sucursalService:SucursalService,
    private router: Router,
    private routeparams: ActivatedRoute,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {

    this.routeparams.params
      .pipe(
        switchMap(({ code }) => this.sucursalService.getcodepassword( code))
      )
      .subscribe((resp) => {

        console.log(resp)

        if(resp.data.ok){

          this.form.get('email')!.setValue(resp.data.user.email)
        }else{

          Swal.fire({
            icon: 'error',
            title: 'Codigo Expirado, redireccionado al login',
            showConfirmButton: false,
            timer: 1500
          }).then((result) =>{

            this.router.navigate(['/login-sucursal']);

          })


        }

      });


  }

  continuar(){

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    let data = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.sucursalService.cambiopassword(data).subscribe((resp) => {
      console.log(resp);

      if (resp.data) {

        if (resp.data.token) {


          Swal.fire({
            icon: 'success',
            title: 'Contraseña cambiada con éxito, redireccionando a la sucursal',
            showConfirmButton: false,
            timer: 1500
          }).then((result) =>{

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


          })


        } else {
          Swal.fire({
            icon: 'error',
            title: 'Ha ocurrido un error',
            showConfirmButton: false,
            timer: 1500
          })
        }
      }
    });

  }

}
