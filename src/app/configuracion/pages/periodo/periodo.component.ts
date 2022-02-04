import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Periodo, Carrito, TotalCarro, ProductoCarro } from '../../../ecommerce/interfaces/ecommerce.interface';
import { CategoriasService } from '../../../ecommerce/services/categorias.service';

@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.component.html',
})
export class PeriodoComponent implements OnInit {

  @Input() periodos!:Periodo[];
  @Output() totalcarro: EventEmitter<TotalCarro> = new EventEmitter();
  @Input() periodonum!:number;

  form:FormGroup = this.fb.group({
    periodo:['',Validators.required],
  })

  seleccion = {
    periodo: ''
  }

  constructor(private fb: FormBuilder, private CategoriasService:CategoriasService) { }

  ngOnInit(): void {



    let index = JSON.parse(localStorage.getItem('index')!);


    let carrito: Carrito[] =  JSON.parse(localStorage.getItem('carrito')!);

    let selectperiodo: any = carrito[index].periodo;


    this.seleccion.periodo = selectperiodo ;

    this.form.reset(this.seleccion);

    this.calculototal();


  }

  modificarcarro(){

    let index = JSON.parse(localStorage.getItem('index')!);

    let carrito: Carrito[] =  JSON.parse(localStorage.getItem('carrito')!);

    carrito[index].periodo = this.form.value.periodo;

    localStorage.setItem('carrito',JSON.stringify(carrito));


    this.calculototal();
  }


  calculototal(){

   let productoscarro = this.CategoriasService.calculototalcarro();

    this.totalcarro.emit(productoscarro)


  }



}
