import { Component, Input, OnInit } from '@angular/core';
import { Result } from '../../../ecommerce/interfaces/dominios.interfaces';

@Component({
  selector: 'app-modal-dominio',
  templateUrl: './modal-dominio.component.html'
})
export class ModalDominioComponent implements OnInit {

  @Input() dominios!:Result[];
  @Input() dominiobuscado!:string;

  disponiblebuscado:number = 0;

  constructor() { }

  ngOnInit(): void {
    console.log(this.dominios);
    this.dominios.forEach(element => {
      if(element.domain == this.dominiobuscado){
        this.disponiblebuscado = 1;
      }
    });

  }

  agregarcarro(item: Result){

    item.agregado = true;

    console.log(item.agregado);

  }

}
