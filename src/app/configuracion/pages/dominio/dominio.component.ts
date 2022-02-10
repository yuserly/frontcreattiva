import { Productos } from './../../../ecommerce/interfaces/ecommerce.interface';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DominiosService } from '../../../ecommerce/services/dominios.service';
import { Result, PrecioDominios } from '../../../ecommerce/interfaces/dominios.interfaces';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TotalCarro, Carrito } from '../../../ecommerce/interfaces/ecommerce.interface';
import { CategoriasService } from '../../../ecommerce/services/categorias.service';
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
  dominioguardado:string = '';

  form:FormGroup = this.fb.group({
    dominio:['',Validators.required],
    extension:['cl',Validators.required]
  })

  form2:FormGroup = this.fb.group({
    dominio:['',Validators.required],
    extension:['cl',Validators.required]
  })

  seleccion = {
    dominio: '',
    extension:''
  }

  @Output() totalcarrod: EventEmitter<TotalCarro> = new EventEmitter();
  @Input() dominionum!:number;
  @Input() dominioscarrito:Carrito[] = [];


  constructor(private DominiosService:DominiosService, private fb: FormBuilder, private CategoriasService: CategoriasService) { }

  ngOnInit(): void {

    console.log(this.dominioscarrito);

  }

  limpiarDomGuardado(){
    this.dominioguardado = '';
  }
  guardardominio(){
    if(this.form2.invalid){
      this.form2.markAllAsTouched()
      return;
    }

    const dominio = this.form2.value.dominio;
    const extension = this.form2.value.extension;

    this.dominioguardado = `${dominio}${extension}`;

    let index = JSON.parse(localStorage.getItem('index')!);
    let carrito: Carrito[] =  JSON.parse(localStorage.getItem('carrito')!);
    carrito[index].dominio = this.dominioguardado;
    localStorage.setItem('carrito',JSON.stringify(carrito));




    //console.log(JSON.parse(localStorage.getItem('carrito')!));

  }

  buscardominio(){

    this.dominios = [];

    if(this.form.invalid){
      this.form.markAllAsTouched()
      return;
    }


    const dominio = this.form.value.dominio;
    const extension = this.form.value.extension;

    this.dominiobuscado = `${dominio}.${extension}`;

    //console.log(this.dominiobuscado);

    this.DominiosService.getdominios(dominio, extension).subscribe( resp => {


      resp.data.results.forEach((element) => {
        
        this.dominioscarrito.forEach((element2) => {
          
          if(element.domain===element2.dominio){
            element.agregado = true;
          }
          
        });
        
      });

        this.dominios = resp.data.results;

        //console.log(this.dominios)
     })

  }

  eliminardominio(dominio:any){

    let index = JSON.parse(localStorage.getItem('index')!);

    let carrito: Carrito[] = JSON.parse(localStorage.getItem('carrito')!);

    carrito.map((p, i) => {
      if (p.producto.id_producto == 17||
          p.producto.id_producto == 18||
          p.producto.id_producto == 19||
          p.producto.id_producto == 20||
          p.producto.id_producto == 21||
          p.producto.id_producto == 22
          ) {
        if(p.dominio===dominio){
          console.log(i);
          carrito.splice(i, 1);
        }
      }
      return p;
    });

    localStorage.setItem('carrito', JSON.stringify(carrito));
    let productoscarro = this.CategoriasService.calculototalcarro();
    this.totalcarrod.emit(productoscarro);

    carrito =  JSON.parse(localStorage.getItem('carrito')!);

    this.dominioscarrito = carrito;



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

    this.dominioguardado = '';

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

  limpiarinput(){

    let dominio = this.form.value.dominio?.trim();
    let arrays = dominio.split(".")
    let reemplazar = arrays[1];
    dominio = dominio.replace(".", "");
    dominio = dominio.replace(reemplazar, "")

    if(this.form.value.extension != ''){
      this.seleccion.dominio = dominio;
      this.seleccion.extension = this.form.value.extension
    }else{

      this.seleccion.dominio = dominio;
      this.seleccion.extension = '';

    }

    this.form.reset(this.seleccion);
  }

  totalcarrodomain(carrito:TotalCarro){

    this.totalcarrod.emit(carrito)

  }

  uptlistdominios(carrito:Carrito[]){
    this.dominioscarrito = carrito;
  }

}
