import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Periodo, Carrito, TotalCarro, ProductoCarro, Productos } from '../../../ecommerce/interfaces/ecommerce.interface';
import { CategoriasService } from '../../../ecommerce/services/categorias.service';

@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.component.html',
})
export class PeriodoComponent implements OnInit {

  invalidPeriodo:number = 0;

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
  mostrarPeriodoMes:number = 0; 
  mostrarPeriodo1Year:number = 0;
  mostrarPeriodo2Year:number = 0;
  mostrarPeriodo3Year:number = 0;
  mostrarPagoUnico:number = 0;

  constructor(private fb: FormBuilder, private CategoriasService:CategoriasService) { }

  ngOnInit(): void {



    let index = JSON.parse(localStorage.getItem('index')!);
    let carrito: Carrito[] =  JSON.parse(localStorage.getItem('carrito')!);
    this.producto = carrito[index].producto;

    if(this.producto.subcategoria_id == 23 || this.producto.subcategoria_id == 18){
      this.mostrarPeriodoMes = 1;
    }

    //Hosting
    if(this.producto.subcategoria_id == 1 ||
      this.producto.subcategoria_id == 2 ||
      this.producto.subcategoria_id == 3 ||
      this.producto.subcategoria_id == 4 ||
      this.producto.subcategoria_id == 5
      ){

      this.mostrarPeriodo1Year = 1;
      this.mostrarPeriodo2Year = 1;
      this.mostrarPeriodo3Year = 1;

    }
    //vps
    if(this.producto.subcategoria_id == 6 ||
      this.producto.subcategoria_id == 7 ||
      this.producto.subcategoria_id == 8 ||
      this.producto.subcategoria_id == 9 ||
      this.producto.subcategoria_id == 10||
      this.producto.subcategoria_id == 12||
      this.producto.subcategoria_id == 13||
      this.producto.subcategoria_id == 15
      ){

      this.mostrarPeriodoMes = 1;
      this.mostrarPeriodo1Year = 1;
      this.mostrarPeriodo2Year = 1;
      this.mostrarPeriodo3Year = 1;

    }



    if(this.producto.subcategoria_id == 14  ||
      this.producto.subcategoria_id == 16 ||
      this.producto.subcategoria_id == 22||
      this.producto.subcategoria_id == 19){

      this.mostrarPagoUnico = 1;

    }

    if(this.producto.subcategoria_id == 11){

      this.mostrarPeriodoMes = 1;

    }

    if(this.producto.subcategoria_id == 17 || this.producto.subcategoria_id == 20){
      //Licencias Google Workspace y Microsoft 365
      this.mostrarPeriodoMes = 1;
      this.mostrarPeriodo1Year = 1;

    }

    console.log("periodos");
    console.log(carrito[index]);

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
