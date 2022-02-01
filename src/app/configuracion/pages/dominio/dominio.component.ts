import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DominiosService } from '../../../ecommerce/services/dominios.service';
import { Result, PrecioDominios } from '../../../ecommerce/interfaces/dominios.interfaces';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TotalCarro } from '../../../ecommerce/interfaces/ecommerce.interface';

@Component({
  selector: 'app-dominio',
  templateUrl: './dominio.component.html',
})
export class DominioComponent implements OnInit {

  mostrar:number = 0;
  mostrarold: number = 0;
  dominios: Result[] = [];
  preciodominio: PrecioDominios[] = [];
  dominiobuscado:string = '';

  form:FormGroup = this.fb.group({
    dominio:['',Validators.required],
    extension:['',Validators.required]
  })

  @Output() totalcarrod: EventEmitter<TotalCarro> = new EventEmitter();

  constructor(private DominiosService:DominiosService, private fb: FormBuilder) { }

  ngOnInit(): void {

  }

  buscardominio(){

    if(this.form.invalid){
      this.form.markAllAsTouched()
      return;
    }


    const dominio = this.form.value.dominio;
    const extension = this.form.value.extension;

    this.dominiobuscado = `${dominio}.${extension}`;

    //console.log(this.dominiobuscado);

    this.DominiosService.getdominios(dominio, extension).subscribe( resp => {

      this.dominios = resp.data.results;



      console.log(this.dominios)
     })

  }




  nuevodominio(){
    console.log(this.mostrar)

    if(this.mostrar == 0){
      this.mostrar = 1;
      this.mostrarold = 0;
    }else{
      this.mostrar = 0;
      this.mostrarold = 0;
    }

  }

  dominioold(){

    if(this.mostrarold == 0){
      this.mostrar = 0;
      this.mostrarold = 1;
    }else{
      this.mostrar = 0;
      this.mostrarold = 0;
    }

  }

  totalcarrodomain(carrito:TotalCarro){

    this.totalcarrod.emit(carrito)

  }

}
