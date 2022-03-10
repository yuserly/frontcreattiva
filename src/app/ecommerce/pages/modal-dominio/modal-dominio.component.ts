import { DominiosService } from './../../services/dominios.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Result } from '../../interfaces/dominios.interfaces';
import {
  Carrito,
  TotalCarro,
} from '../../interfaces/ecommerce.interface';
import { CategoriasService } from '../../services/categorias.service';

@Component({
  selector: 'app-modal-dominio',
  templateUrl: './modal-dominio.component.html',
})
export class ModalDominioComponent implements OnInit {
  @Input() dominios!: Result[];
  @Input() dominiosencarrito:Carrito[] = [];
  @Input() dominiobuscado!: string;
  @Input() statusDominioBuscado!: boolean;
  @Output() totalcarro: EventEmitter<TotalCarro> = new EventEmitter();
  @Output() dominioscarrito: EventEmitter<Carrito[]> = new EventEmitter();
  data_dominiobuscado!: [];

  //disponiblebuscado: number = 0;

  constructor(private CategoriasService: CategoriasService, private DominiosService: DominiosService) {}

  ngOnInit(): void {


  }


  addAllDomains(){

    let carro: Carrito[] = JSON.parse(localStorage.getItem('carrito')!);

    this.dominios.forEach((element) => {

      if(element.status=='free'){

        this.CategoriasService.getperiodos(element.producto.id_producto).subscribe(
          (resp) => {
            
            carro.push({

              producto: element.producto,
              periodo: 4,
              dominio: element.domain,
              sistemaoperativo: 0,
              versionsistema: 0,
              administrar: 0,
              ip: '',
              periodos: resp,
              cantidad: 1,
              cupon_descuento: 0

            });

            localStorage.setItem('carrito', JSON.stringify(carro));

            let productoscarro = this.CategoriasService.calculototalcarro();

            this.totalcarro.emit(productoscarro);

            element.agregado = true;

            carro = JSON.parse(localStorage.getItem('carrito')!);

            this.dominioscarrito.emit(carro);

            this.itemsCarrito();

          }
        );

      }

    });

  }

  agregarcarro(item: Result) {
    //console.log(item);
    let carro: Carrito[] = JSON.parse(localStorage.getItem('carrito')!);

    this.CategoriasService.getperiodos(item.producto.id_producto).subscribe(
      (resp) => {
        
        carro.push({
          producto: item.producto,
          periodo: 4,
          dominio: item.domain,
          sistemaoperativo: 0,
          versionsistema: 0,
          administrar: 0,
          ip: '',
          periodos: resp,
        });

        localStorage.setItem('carrito', JSON.stringify(carro));

        let productoscarro = this.CategoriasService.calculototalcarro();

        this.totalcarro.emit(productoscarro);

        item.agregado = true;

        carro = JSON.parse(localStorage.getItem('carrito')!);

        this.dominioscarrito.emit(carro);

        this.itemsCarrito();

      }
    );

    

    //console.log(JSON.parse(localStorage.getItem('carrito')!))
  }

  itemsCarrito(){
    let index = JSON.parse(localStorage.getItem('index')!);

    let carrito: Carrito[] =  JSON.parse(localStorage.getItem('carrito')!);

    this.DominiosService.totalCarro = carrito.length;
  }
}
