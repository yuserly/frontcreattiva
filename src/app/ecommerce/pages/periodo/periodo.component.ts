import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Periodo, Carrito, TotalCarro, ProductoCarro, Productos } from '../../../ecommerce/interfaces/ecommerce.interface';
import { CategoriasService } from '../../../ecommerce/services/categorias.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.component.html',
})
export class PeriodoComponent implements OnInit {

   //owl
  owl_periodos: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1,
        margin: 10
      },
      400: {
        items: 3
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

  invalidPeriodo:number = 0;
  mostrarYearFree:boolean = false;

  @Input() periodos!:Periodo[];
  @Output() totalcarro: EventEmitter<TotalCarro> = new EventEmitter();
  @Input() periodonum!:number;

  form:FormGroup = this.fb.group({
    periodo:['',Validators.required],
  })

  seleccion = {
    periodo: ''
  }

  producto!:Productos;

  constructor(private fb: FormBuilder, private CategoriasService:CategoriasService) { }

  ngOnInit(): void {



    let index = JSON.parse(localStorage.getItem('index')!);
    let carrito: Carrito[] =  JSON.parse(localStorage.getItem('carrito')!);
    this.producto = carrito[index].producto;
    let selectperiodo: any = carrito[index].periodo;
    this.seleccion.periodo = selectperiodo ;
    this.form.reset(this.seleccion);

    if(this.producto.tipo_producto_id==1){
      this.mostrarYearFree = true;
    }else{
      this.mostrarYearFree = false;
    }

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

  validarFormularios():boolean {

    
    let index = JSON.parse(localStorage.getItem('index')!);
    let carrito: Carrito[] =  JSON.parse(localStorage.getItem('carrito')!);
    if(carrito[index].periodo!=0){
      this.invalidPeriodo = 1;
      return true;
    }else{
      this.invalidPeriodo = 2;
      let el = document.getElementById("invalidPeriodo");
      if(el){el.scrollIntoView({ behavior: 'smooth' });}
      return false;
    }
    
    
  }



}
