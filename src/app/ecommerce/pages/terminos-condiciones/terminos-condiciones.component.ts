import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CategoriasService } from '../../services/categorias.service';

@Component({
  selector: 'app-terminos-condiciones',
  templateUrl: './terminos-condiciones.component.html'
})
export class TerminosCondicionesComponent implements OnInit {

  mostrar:string = '';

  constructor(private router: Router, private categoriasServices: CategoriasService, private routeparams: ActivatedRoute) { }

  ngOnInit(): void {

    let urlinit = this.routeparams.snapshot.url.join('/');
    let url = urlinit.split('/');

    if(url[1]){

      this.mostrar = url[1];

    }else{

      this.mostrar = url[0];

    }

    console.log("mostrar: "+this.mostrar);

  }

  mostrartc(slug:string){

    this.router.navigate([slug]);

  }

}
