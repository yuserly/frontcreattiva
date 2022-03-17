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
    nombre: ['', Validators.required],
    email: ['', Validators.required],
    telefono: ['', Validators.required],
    mensaje: ['', Validators.required],
  });

  constructor(
    private categoriasServices: CategoriasService,
    private router: Router,
    private fb: FormBuilder) { }

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

    this.data.nombre = this.form.value.nombre;
    this.data.email = this.form.value.email;
    this.data.telefono = this.form.value.telefono;
    this.data.mensaje = this.form.value.mensaje;

    this.categoriasServices.registrarconsulta(this.data).subscribe((respuesta) => {
      
      if(respuesta==1){
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
        this.data = {
          nombre: '',
          telefono:'',
          email:'',
          mensaje:''
        }
        this.form.reset(this.data);

      }

      
    });

    window.scroll(0,0);

  }

}
