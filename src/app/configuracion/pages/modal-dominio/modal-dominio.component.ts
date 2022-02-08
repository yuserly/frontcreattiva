import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Result } from '../../../ecommerce/interfaces/dominios.interfaces';
import { Carrito, TotalCarro } from '../../../ecommerce/interfaces/ecommerce.interface';
import { CategoriasService } from '../../../ecommerce/services/categorias.service';

@Component({
  selector: 'app-modal-dominio',
  templateUrl: './modal-dominio.component.html'
})
export class ModalDominioComponent implements OnInit {

  @Input() dominios!:Result[];
  @Input() dominiobuscado!:string;
  @Output() totalcarro: EventEmitter<TotalCarro> = new EventEmitter();
  @Output() dominioscarrito: EventEmitter<Carrito[]> = new EventEmitter();
  data_dominiobuscado!:[];

  disponiblebuscado:number = 0;

  constructor(private CategoriasService: CategoriasService) { }

  ngOnInit(): void {

    //console.log(this.dominios);
    this.dominios.forEach(element => {
      console.log(element.domain);
      if(element.domain === this.dominiobuscado){
        this.disponiblebuscado = 1;
      }
    });

  }

  agregarcarro(item: Result){

    let carro: Carrito[] = JSON.parse(localStorage.getItem('carrito')!);

    carro.push({
      producto: item.producto,
      periodo: item.periodos[2],
      dominio: item.domain,
      sistemaoperativo: 0,
      versionsistema:0,
      administrar: 0,
      ip: ''
    })

    localStorage.setItem('carrito',JSON.stringify(carro));

    let productoscarro = this.CategoriasService.calculototalcarro();

    this.totalcarro.emit(productoscarro)

    item.agregado = true;

    carro =  JSON.parse(localStorage.getItem('carrito')!);

    this.dominioscarrito.emit(carro)

    //console.log(JSON.parse(localStorage.getItem('carrito')!))



  }

}
