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
  dominioguardado:any = '';
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
    if(carrito[index].dominio!==''){
      this.dominioguardado = carrito[index].dominio;
    }

  }

  // updtglosadetalles(data:Carrito[]){

  //   if(data.length>0){

  //     data.reverse().forEach((element) => {

  //       let cont = 0;
        
  //       if(element.producto.subcategoria_id == 31){
  //         cont++;
  //         if(cont==1){
  
  //           let index = JSON.parse(localStorage.getItem('index')!);
  
  //           let carrito: Carrito[] = JSON.parse(localStorage.getItem('carrito')!);
  
  //           carrito[index].dominio = element.dominio;
  
  //           localStorage.setItem('carrito', JSON.stringify(carrito));
            
  //         }
  //       }
  
  //     });

  //   }else{

  //     let index = JSON.parse(localStorage.getItem('index')!);
  
  //     let carrito: Carrito[] = JSON.parse(localStorage.getItem('carrito')!);

  //     carrito[index].dominio = '';

  //     localStorage.setItem('carrito', JSON.stringify(carrito));

  //   }
    

  // }

  limpiarDomGuardado(){

    this.dominioguardado = '';

    let index = JSON.parse(localStorage.getItem('index')!);

    let carrito: Carrito[] =  JSON.parse(localStorage.getItem('carrito')!);

    carrito[index].dominio = this.dominioguardado;

    localStorage.setItem('carrito',JSON.stringify(carrito));

    let productoscarro = this.CategoriasService.calculototalcarro();

    this.totalcarrod.emit(productoscarro);

  }
  guardardominio(){

    if(this.form2.invalid){
      this.form2.markAllAsTouched()
      return;
    }

    var dominio = this.form2.value.dominio;
    var extension = this.form2.value.extension;

    this.dominioguardado = dominio+'.'+extension;

    console.log("Dominio guardado: "+this.dominioguardado);

    let index = JSON.parse(localStorage.getItem('index')!);

    let carrito: Carrito[] =  JSON.parse(localStorage.getItem('carrito')!);

    carrito[index].dominio = this.dominioguardado;

    localStorage.setItem('carrito',JSON.stringify(carrito));

    let productoscarro = this.CategoriasService.calculototalcarro();

    this.totalcarrod.emit(productoscarro);

    this.dominioscarrito = carrito;

    this.registroDetallesCarrito(carrito[index]);

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

    let contd = 0;

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

    // this.dominioscarrito.reverse().forEach((element) => {

    //   let cont = 0;
      
    //   if(element.producto.subcategoria_id == 31){
    //     cont++;
    //     if(cont==1){

    //       let index = JSON.parse(localStorage.getItem('index')!);

    //       let carrito: Carrito[] = JSON.parse(localStorage.getItem('carrito')!);

    //       carrito[index].dominio = element.dominio;

    //       localStorage.setItem('carrito', JSON.stringify(carrito));
          
    //     }
    //   }

    // });

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
      this.haydominios = true;
      this.nuevodominio();
      
      let el = document.getElementById("invalidDominio");
      if(el){el.scrollIntoView({ behavior: 'smooth' });}
      return false;
    }
    
  }

  scrollToTop(){
    window.scroll(0,0);
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

  limpiardominio1(event: any){

    var dominio = this.form.value.dominio;

    var search1 = dominio.search("http");

    if(!search1){

        var result1 = dominio.split('//');

        dominio = result1[1];

    }

    var search2 = dominio.search("www.");

    if(!search2){

        var result2 = dominio.split('www.');

        dominio = result2[1];
    }

    var search3 = dominio.search(".");

    if(!search3){

      var result3 = dominio.split('.');

      dominio = result3[0];

    }

    var dominiolimpio = dominio.trim();

    this.form.patchValue({dominio:dominiolimpio})

  }

  limpiardominio2(event: any){

    var dominio = this.form2.value.dominio;

    var search1 = dominio.search("http");

    if(!search1){

        var result1 = dominio.split('//');

        dominio = result1[1];

    }

    var search2 = dominio.search("www.");

    if(!search2){

        var result2 = dominio.split('www.');

        dominio = result2[1];
    }

    var search3 = dominio.search(".");

    if(!search3){

      var result3 = dominio.split('.');

      dominio = result3[0];

    }

    var dominiolimpio = dominio.trim();

    this.form2.patchValue({dominio:dominiolimpio})

  }

}
