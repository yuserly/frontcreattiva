import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriasService } from '../../services/categorias.service';
import { switchMap } from 'rxjs/operators';
import { Carrito, PreguntasFrecuentes } from '../../interfaces/ecommerce.interface';

@Component({
  selector: 'app-preguntas-frecuentes',
  templateUrl: './preguntas-frecuentes.component.html'
})
export class PreguntasFrecuentesComponent implements OnInit {

  data:PreguntasFrecuentes[] = [];
  

  constructor(
    private routeparams: ActivatedRoute,
    private CategoriasService: CategoriasService
  ) { 
    this.routeparams.params
      .pipe(
        switchMap(({ slug }) => this.CategoriasService.getfaq(slug))
      )
      .subscribe((resp) => {
        console.log(resp);
        this.data = resp;
      });
  }

  ngOnInit(): void {
  }

}
