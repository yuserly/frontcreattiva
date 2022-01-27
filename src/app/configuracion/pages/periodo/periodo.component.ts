import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Periodo, Carrito, TotalCarro, ProductoCarro } from '../../../ecommerce/interfaces/ecommerce.interface';

@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.component.html',
})
export class PeriodoComponent implements OnInit {

  @Input() periodos!:Periodo[];
  @Output() totalcarro: EventEmitter<TotalCarro> = new EventEmitter();

  form:FormGroup = this.fb.group({
    periodo:['',Validators.required],
  })

  seleccion = {
    periodo: ''
  }

  constructor(private fb: FormBuilder) { }

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

    let carrito: Carrito[] =  JSON.parse(localStorage.getItem('carrito')!);
    let productos: ProductoCarro[] = [];

      let precio = 0;
      let  precioold = 0;
      let ahorroa = 0;

    carrito.forEach((element,i) => {

      console.log(element.periodo)

      if(element.periodo.precio_descuento){
        precio = element.periodo.precio_descuento;
         precioold= element.periodo.precio;
        ahorroa =element.periodo.ahorro;
      }else{

        precio = JSON.parse(element.periodo).precio_descuento;
         precioold= JSON.parse(element.periodo).precio;
        ahorroa =JSON.parse(element.periodo).ahorro;

      }

      productos.push({
        nombre: element.producto.nombre,
        precio: precio,
        precioold: precioold,
        ahorro: ahorroa
      })

      console.log(productos)


      if(element.compradominio){

        element.compradominio.forEach(element1 => {

          productos.push({
            nombre: element1.dominio,
            precio: element1.precio,
            precioold: 0,
            ahorro:0
          })

        });

      }

    });

    let productoscarro: TotalCarro;

    let neto: number = 0;
    let iva: number = 0;
    let total: number = 0;
    let ahorro: number = 0;

    productos.forEach(element => {

      neto += element.precio;
      ahorro += element.ahorro

    });

    iva = Math.round(neto * 0.19) ;
    total = neto + iva;

    productoscarro = {
      productos: productos,
      neto: neto,
      iva: iva,
      total: total,
      ahorro:ahorro
    }

    console.log(productoscarro)

    this.totalcarro.emit(productoscarro)


  }



}
