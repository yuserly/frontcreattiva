import { Productos } from '../../interfaces/ecommerce.interface';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DominiosService } from '../../services/dominios.service';
import { Result, PrecioDominios } from '../../interfaces/dominios.interfaces';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TotalCarro, Carrito } from '../../interfaces/ecommerce.interface';
import { CategoriasService } from '../../services/categorias.service';

@Component({
  selector: 'app-cantidadlicencias',
  templateUrl: './cantidadlicencias.component.html',
})
export class CantidadlicenciasComponent implements OnInit {

  cant_licencias:number = 0;
  form:FormGroup = this.fb.group({
    cantidadlicencias:[1,Validators.required]
  })
  @Output() totalcarrod: EventEmitter<TotalCarro> = new EventEmitter();
  constructor(private fb: FormBuilder, private CategoriasService: CategoriasService) { }

  ngOnInit(): void {

    let index = JSON.parse(localStorage.getItem('index')!);
    let carrito: Carrito[] =  JSON.parse(localStorage.getItem('carrito')!);
    this.form.patchValue({
      cantidadlicencias: carrito[index].cantidad
    });
  }

  addlicencia(){
    this.cant_licencias = this.form.value.cantidadlicencias+1;
    this.form.patchValue({
      cantidadlicencias: this.cant_licencias
    });
    let index = JSON.parse(localStorage.getItem('index')!);
    let carrito: Carrito[] =  JSON.parse(localStorage.getItem('carrito')!);
    carrito[index].cantidad = this.cant_licencias;
    localStorage.setItem('carrito',JSON.stringify(carrito));

    let productoscarro = this.CategoriasService.calculototalcarro();
    this.totalcarrod.emit(productoscarro);
  }
  removelicencia(){
    if(this.form.value.cantidadlicencias>1){
      this.cant_licencias = this.form.value.cantidadlicencias-1;
      this.form.patchValue({
        cantidadlicencias: this.cant_licencias
      });
    }else{
      this.cant_licencias = 1;
      this.form.patchValue({
        cantidadlicencias: this.cant_licencias
      });
    }
    let index = JSON.parse(localStorage.getItem('index')!);
    let carrito: Carrito[] =  JSON.parse(localStorage.getItem('carrito')!);
    carrito[index].cantidad = this.cant_licencias;
    localStorage.setItem('carrito',JSON.stringify(carrito));

    let productoscarro = this.CategoriasService.calculototalcarro();
    this.totalcarrod.emit(productoscarro);

  }
  uptcantidadlicencias(){
    this.cant_licencias = this.form.value.cantidadlicencias;
    let index = JSON.parse(localStorage.getItem('index')!);
    let carrito: Carrito[] =  JSON.parse(localStorage.getItem('carrito')!);
    carrito[index].cantidad = this.cant_licencias;
    localStorage.setItem('carrito',JSON.stringify(carrito));

    let productoscarro = this.CategoriasService.calculototalcarro();
    this.totalcarrod.emit(productoscarro);
  }



}
