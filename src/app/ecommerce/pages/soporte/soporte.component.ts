import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CategoriasService } from '../../services/categorias.service';
import { PreguntasFrecuentes } from '../../interfaces/ecommerce.interface';


@Component({
  selector: 'app-soporte',
  templateUrl: './soporte.component.html'
})
export class SoporteComponent implements OnInit {

  p: any= 1

  collection: any[] = [
  { id: 11, name: 'Mr. Nice' },
  { id: 12, name: 'Narco' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' }
];

  ip:string = '';
  mostrarIP:boolean = false;
  mostrarPf:boolean = false;
  PfCargadas:boolean = false;
  mostrarDNS:boolean = false;

  PreguntasFrecuentes: PreguntasFrecuentes[] = [];
  DnsCreattiva: PreguntasFrecuentes[] = [];

  @ViewChild('subfocoresultado') subfocoresultado!: ElementRef;

  constructor(private categoriasServices: CategoriasService) {

  }

  ngOnInit(): void {

    this.ip = '';
    this.mostrarIP = false;
    this.mostrarDNS = false;

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
          console.log(this.PreguntasFrecuentes);

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
