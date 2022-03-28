import { Productos } from '../../interfaces/ecommerce.interface';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DominiosService } from '../../services/dominios.service';
import { Result, PrecioDominios } from '../../interfaces/dominios.interfaces';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TotalCarro, Carrito } from '../../interfaces/ecommerce.interface';
import { CategoriasService } from '../../services/categorias.service';
@Component({
  selector: 'app-dominio',
  templateUrl: './dominio.component.html',
})
export class DominioComponent implements OnInit {

  mostrar:number = 0;
  mostrarold: number = 0;
  haydominios:boolean = false;
  sinDominio:boolean = false;
  dominios: Result[] = [];
  preciodominio: PrecioDominios[] = [];
  dominiobuscado:string = '';
  statusDominioBuscado:boolean = false;
  dominioguardado:string = '';
  errorDominio:boolean = false;

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
    //validar si existen dominios buscados en el carrito
    this.haydominios = this.consultarDominiosBuscados();
    //validar si existe un dominio guardado y guardar
    let index = JSON.parse(localStorage.getItem('index')!);
    let carrito: Carrito[] =  JSON.parse(localStorage.getItem('carrito')!);
    console.log(carrito);
    console.log(carrito[index].dominio);
    if(carrito[index].dominio){
      console.log("Dominio:" +carrito[index].dominio);
      this.dominioguardado = <string>carrito[index].dominio;
    }

  }

  limpiarDomGuardado(){
    this.dominioguardado = '';
    let index = JSON.parse(localStorage.getItem('index')!);
    let carrito: Carrito[] =  JSON.parse(localStorage.getItem('carrito')!);
    carrito[index].dominio = this.dominioguardado;
    localStorage.setItem('carrito',JSON.stringify(carrito));
  }
  guardardominio(){
    if(this.form2.invalid){
      this.form2.markAllAsTouched()
      return;
    }

    const dominio = this.form2.value.dominio;
    const extension = this.form2.value.extension;

    this.dominioguardado = dominio+'.'+extension;

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

    this.statusDominioBuscado = false;
    const dominio = this.form.value.dominio;
    const extension = this.form.value.extension;

    this.dominiobuscado = `${dominio}.${extension}`;

    //console.log(this.dominiobuscado);

    this.DominiosService.getdominios(dominio, extension).subscribe( resp => {


      resp.data.results.forEach((element) => {

        //console.log("dominio: "+element.domain+" ,estatus: "+element.status);

        if(element.domain==this.dominiobuscado){

          if(element.status=='free'){

             this.statusDominioBuscado = true;

          }else{

             this.statusDominioBuscado = false;

          }
         
        }

        this.dominioscarrito.forEach((element2) => {

          if(element.domain===element2.dominio){

            element.agregado = true;

          }

        });

      });

        this.dominios = resp.data.results;

        console.log(this.dominios)
     })

  }

  eliminardominio(dominio:any){

    let index = JSON.parse(localStorage.getItem('index')!);

    let carrito: Carrito[] = JSON.parse(localStorage.getItem('carrito')!);

    carrito.map((p, i) => {
      if (p.producto.subcategoria_id == 31) {
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
    this.limpiarDomGuardado();

  }

  dominioold(){

    if(this.mostrarold == 0){
      this.mostrar = 0;
      this.mostrarold = 1;
    }else{
      this.mostrar = 0;
      this.mostrarold = 0;
    }

    console.log(this.dominioscarrito);
    
    let index = JSON.parse(localStorage.getItem('index')!);

    let carrito: Carrito[] = JSON.parse(localStorage.getItem('carrito')!);

    carrito.map((p, i) => {
      if (p.producto.subcategoria_id == 31) {

          carrito.splice(i);
      }
      return p;
    });


    localStorage.setItem('carrito', JSON.stringify(carrito));
    let productoscarro = this.CategoriasService.calculototalcarro();
    this.totalcarrod.emit(productoscarro);

    carrito =  JSON.parse(localStorage.getItem('carrito')!);

    this.dominioscarrito = carrito;
    

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

  consultarDominiosBuscados():boolean{
    let index = JSON.parse(localStorage.getItem('index')!);

    let carrito: Carrito[] = JSON.parse(localStorage.getItem('carrito')!);

    let cont = 0;

    carrito.map((p, i) => {
      if (p.producto.subcategoria_id == 31) {
        cont++;
      }
      return p;
    });

    if(cont>0){
      return true;
    }else{
      return false;
    }
  }

  validarFormularios():boolean {

    let index = JSON.parse(localStorage.getItem('index')!);
    let carrito: Carrito[] =  JSON.parse(localStorage.getItem('carrito')!);
    let cont = 0;
    console.log("producto buscado: ");
    console.log(carrito);
    //console.log(carrito[index]);


    if(carrito[index].dominio){

      this.errorDominio = false;
      return true;
      
    }else if(carrito.length>1){
      carrito.map((p, i) => {
        if (p.producto.subcategoria_id == 31) {
              cont++;
        }
        return p;
      });
      if(cont>0){
        this.errorDominio = false;
        return true;
      }else{
        this.errorDominio = true;
        if(this.mostrar==0 && this.mostrarold==0){
          this.mostrar = 1;
          this.mostrarold = 0;
        }
        let el = document.getElementById("invalidDominio");

      if(el){el.scrollIntoView({ behavior: 'smooth' });}
        return false;
      }

    }else{
      
      this.errorDominio = true;
      if(this.mostrar==0 && this.mostrarold==0){
        this.mostrar = 1;
        this.mostrarold = 0;
      }
      
      let el = document.getElementById("invalidDominio");
      if(el){el.scrollIntoView({ behavior: 'smooth' });}
      return false;
    }
    
  }

  scrollToTop(){
    window.scroll(0,0);
  }

}
