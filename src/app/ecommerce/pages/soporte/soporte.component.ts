import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriasService } from '../../services/categorias.service';
import { PreguntasFrecuentes } from '../../interfaces/ecommerce.interface';
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

  PreguntasFrecuentes: PreguntasFrecuentes[] = [];
  DnsCreattiva: PreguntasFrecuentes[] = [];

  @ViewChild('subfocoresultado') subfocoresultado!: ElementRef;

  constructor(private categoriasServices: CategoriasService, private routeparams: ActivatedRoute,) {


  }

  ngOnInit(): void {

    this.ip = '';
    this.mostrarIP = false;
    this.mostrarDNS = false;

    if(this.routeparams.snapshot.url.join('/')=='ip'){
      this.mostrarip();
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
        }, 300);

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



}
