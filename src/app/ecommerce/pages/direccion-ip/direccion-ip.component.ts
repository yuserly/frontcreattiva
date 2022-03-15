import { Productos } from '../../interfaces/ecommerce.interface';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DominiosService } from '../../services/dominios.service';
import { Result, PrecioDominios } from '../../interfaces/dominios.interfaces';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    ip:['',[Validators.required]]
  })

  @Output() totalcarrod: EventEmitter<TotalCarro> = new EventEmitter();

  constructor(private DominiosService:DominiosService, private fb: FormBuilder, private CategoriasService: CategoriasService) { }

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

}
