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


  constructor(private CategoriasService: CategoriasService, private router: Router) {

  }

  ngOnInit(): void {

    let infopago = JSON.parse(localStorage.getItem('infopago')!)

    console.log(infopago);

    if(!infopago){
      this.router.navigate(['/facturacion']);
    }

    if(infopago.metodopago == 3 || infopago.metodopago == '3'){

      this.router.navigate(['/pago-transferencia']);

    }

    if((infopago.metodopago == 4 || infopago.metodopago == '4') && infopago.pagoexitoso == 1 ){

      this.router.navigate(['/pago-exitoso']);

    }

    this.metodopago = infopago.metodopago;

    this.urlpago = infopago.url;

    this.token = infopago.token;

   this.totalcarroarray = this.CategoriasService.calculototalcarro();
  }

}
