import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriasService } from '../../services/categorias.service';
import { PreguntasFrecuentes } from '../../interfaces/ecommerce.interface';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-soporte',
  templateUrl: './soporte.component.html'
})
export class SoporteComponent implements OnInit {

  //owl
  owl_opciones: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 2,
        margin: 10
      },
      400: {
        items: 4
      },
      740: {
        items: 6
      },
      940: {
        items: 7
      }
    },
    nav: true
  }

  page: number= 1;
  maxSize: number = 3;

  ip:string = '';
  mostrarIP:boolean = false;
  mostrarPf:boolean = false;
  PfCargadas:boolean = false;
  mostrarDNS:boolean = false;
  totalpf: number = 0;

  form:FormGroup = this.fb.group({
    textobuscarpf: [
      '',
      [Validators.required],
    ]
  });

  PreguntasFrecuentes: PreguntasFrecuentes[] = [];
  DnsCreattiva: PreguntasFrecuentes[] = [];

  @ViewChild('subfocoresultado') subfocoresultado!: ElementRef;

  constructor(private categoriasServices: CategoriasService, private routeparams: ActivatedRoute,private fb: FormBuilder) {


  }

  ngOnInit(): void {

    this.ip = '';
    this.mostrarIP = false;
    this.mostrarDNS = false;

    if(this.routeparams.snapshot.url.join('/')=='ip'){
      this.mostrarip();
    }
    if(this.routeparams.snapshot.url.join('/')=='soporte/faq'){
      this.preguntasFrecuentes();
    }


  }

  mostrarip(){

    this.resetElements();

    this.mostrarIP = true;

    this.categoriasServices.consultarIP().subscribe((miip) => {

      setTimeout(() => {
        this.ip = miip.data.ip;
        this.subfocoresultado.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 400);


    });

  }

  preguntasFrecuentes(){

    this.resetElements();

    this.mostrarIP = false;
    this.mostrarPf = true;

    this.categoriasServices.preguntasfrecuentesall().subscribe((respuesta) => {

        this.PfCargadas = true;
        setTimeout(() => {
          this.PreguntasFrecuentes = respuesta;
          this.totalpf = this.PreguntasFrecuentes.length;
          this.maxSize = 5;
          console.log(this.PreguntasFrecuentes);
        }, 100);

    });

    setTimeout(() => {
      this.subfocoresultado.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });

    }, 1000);

  }

  dns(slug:string){

    this.resetElements();

      this.categoriasServices.getfaq(slug).subscribe((respuesta) => {

        this.mostrarDNS = true;

        setTimeout(() => {
          console.log(respuesta);
          this.DnsCreattiva = respuesta;
          
        }, 600);
    });
    
    setTimeout(() => {
      this.subfocoresultado.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });

    }, 1000);
    
  }

  resetElements(){

    this.ip = '';
    this.mostrarIP = false;
    this.mostrarPf = false;
    this.mostrarDNS = false;

  }

  busquedageneralpf(){
    
    if(this.form.invalid){
      this.form.markAllAsTouched()
      return;
    }

    let resultados:any = [];

    /*

    if (localStorage.getItem('resultados_busqueda')) {

      this.PreguntasFrecuentes = JSON.parse(localStorage.getItem('resultados_busqueda')!);

    } else {

      this.PreguntasFrecuentes = [];

    }
    */

    let textoBusqueda = this.form.value.textobuscarpf;

    console.log("pregunta buscada: "+textoBusqueda);

    this.categoriasServices.getPreguntasfrecuentesCoincidentes(textoBusqueda).subscribe((preguntasEncontradas) => {
      console.log(preguntasEncontradas);

      this.PreguntasFrecuentes = preguntasEncontradas;
      this.totalpf = this.PreguntasFrecuentes.length;
      this.maxSize = 5;

      /*
      this.PreguntasFrecuentes = productosEncontrados;

      localStorage.setItem('resultados_busqueda', JSON.stringify(this.productosbuscados));

      console.log("nuevos productos");
      console.log(this.productosbuscados);

      this.productosbusc.emit(this.productosbuscados);

      this.router.navigate(['/resultados-busqueda']);
      */
      
    });

    /*

    localStorage.setItem('textobuscado', JSON.stringify(textoBusqueda));

    this.categoriasServices.getProductosCoincidentes(textoBusqueda).subscribe((productosEncontrados) => {
      console.log(productosEncontrados);

      this.PreguntasFrecuentes = productosEncontrados;

      localStorage.setItem('resultados_busqueda', JSON.stringify(this.productosbuscados));

      console.log("nuevos productos");
      console.log(this.productosbuscados);

      this.productosbusc.emit(this.productosbuscados);

      this.router.navigate(['/resultados-busqueda']);
      
    });
    */

  }



}
