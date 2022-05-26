import { Productos } from '../../interfaces/ecommerce.interface';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DominiosService } from '../../services/dominios.service';
import { Result, PrecioDominios } from '../../interfaces/dominios.interfaces';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from '../../../shared/validator/validator.service';
import { TotalCarro, Carrito } from '../../interfaces/ecommerce.interface';
import { CategoriasService } from '../../services/categorias.service';


@Component({
  selector: 'app-direccion-ip',
  templateUrl: './direccion-ip.component.html'
})
export class DireccionIpComponent implements OnInit {

  ipguardada:string = '';
  errorIP:boolean = false;
  form:FormGroup = this.fb.group({
    ip: [
      '',
      [Validators.required, Validators.pattern(this.validacion.ipPattern)],
    ]
  });

  get mensajeerrorip(): string {
    const error = this.form.get('ip')?.errors;

    if (error?.required) {
      return 'La IP es requerida';
    } else if (error?.pattern) {
      return 'Debe ingresar una IP válida';
    }

    return '';
  };

  @Output() totalcarrod: EventEmitter<TotalCarro> = new EventEmitter();

  constructor(private validacion: ValidatorService, private DominiosService:DominiosService, private fb: FormBuilder, private CategoriasService: CategoriasService) { }

  ngOnInit(): void {

    //guardar IP del sistema
    let index = JSON.parse(localStorage.getItem('index')!);
    let carrito: Carrito[] =  JSON.parse(localStorage.getItem('carrito')!);
    if(carrito[index].ip){
      this.ipguardada = <string>carrito[index].ip;
    }

    console.log("carrito despues de iniciar");
    console.log(carrito);

  }

  guardarip(){

    
    if(this.form.invalid){
      this.form.markAllAsTouched()
      return;
    }

    const ip = this.form.value.ip;

    let index = JSON.parse(localStorage.getItem('index')!);
    let carrito: Carrito[] =  JSON.parse(localStorage.getItem('carrito')!);
    this.ipguardada = ip;
    carrito[index].ip = this.ipguardada;
    carrito[index].producto.nombre = carrito[index].producto.nombre + ' - IP: ' +this.ipguardada;
    localStorage.setItem('carrito',JSON.stringify(carrito));

    console.log("carro actualizado: ");
    console.log(carrito);

    let productoscarro = this.CategoriasService.calculototalcarro();
    this.totalcarrod.emit(productoscarro);

    this.registroDetallesCarrito(carrito[index]);
    

  }

  limpiarIpGuardada(){
    
    this.ipguardada = '';
    let index = JSON.parse(localStorage.getItem('index')!);
    let carrito: Carrito[] =  JSON.parse(localStorage.getItem('carrito')!);
    carrito[index].ip = this.ipguardada;

    let stringNombre = carrito[index].producto.nombre.split('-');

    carrito[index].producto.nombre = stringNombre[0].trim();

    localStorage.setItem('carrito',JSON.stringify(carrito));

    let productoscarro = this.CategoriasService.calculototalcarro();
    this.totalcarrod.emit(productoscarro);

    //localStorage.setItem('carrito',JSON.stringify(carrito));
    
  }

  validarip(){

    if(!this.form.get('ip')?.errors){

      /*
        let data = {
          rut: this.form.value.ip
        }

        this.CategoriasService.validarrut(data).subscribe(resp =>{
          console.log(resp)

          if(resp.data){

            Swal.fire({
              title: 'RUT en uso',
              text: "Este RUT ya se encuentra en uso ¿Quieres iniciar sesión?",
              icon: 'info',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Login',
              cancelButtonText: 'Cancelar',
              allowOutsideClick: false
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/login']);
              }else{
                this.ngOnInit();
              }
            })

          }

        })

        */
    }
  }

  validarcampo(campo: string) {
    return this.form.get(campo)?.invalid && this.form.get(campo)?.touched;
  }

  registroDetallesCarrito(data:any){

    let url = location.href;

    let usuario = JSON.parse(localStorage.getItem('usuario')!);

    let detallesAdicionales= [{
      "url":url,
      "usuario":usuario
    }];

    let arrayInfo= [{
      "opc":'updt',
      "data":data,
      "adicionales":detallesAdicionales
    }];

    this.CategoriasService
        .registrocarrito(arrayInfo)
        .subscribe((resp) => {
          console.log(resp);
        });

  }

  

}
