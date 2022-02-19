import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriasService } from '../../services/categorias.service';
import { TotalCarro } from '../../interfaces/ecommerce.interface';

@Component({
  selector: 'app-formulario-pago',
  templateUrl: './formulario-pago.component.html',
  styleUrls: ['./formulario-pago.component.css']
})
export class FormularioPagoComponent implements OnInit {

  totalcarroarray!:TotalCarro;

  // url y token webpay

  urlpago:string = '';
  token:string = '';
  metodopago:number = 0;


  constructor(private CategoriasService: CategoriasService, private router: Router) { }

  ngOnInit(): void {

    let infopago = JSON.parse(localStorage.getItem('infopago')!)

    if(infopago.metodopago == 3 || infopago.metodopago == '3'){

      this.router.navigate(['/pago-transferencia']);

    }

    this.metodopago = infopago.metodopago;

    this.urlpago = infopago.url;

    this.token = infopago.token;

   this.totalcarroarray = this.CategoriasService.calculototalcarro();
  }

}
