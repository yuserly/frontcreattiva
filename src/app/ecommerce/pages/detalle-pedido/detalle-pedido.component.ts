import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Periodo, Carrito, TotalCarro, ProductoCarro, Productos } from '../../../ecommerce/interfaces/ecommerce.interface';
import { CategoriasService } from '../../../ecommerce/services/categorias.service';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html'
})
export class DetallePedidoComponent implements OnInit {

   @Output() totalcarrod: EventEmitter<TotalCarro> = new EventEmitter();
   @Input() totalcarroarray!:TotalCarro;
   @Input() aplicarCupon!:number;

  validezcupon:number = 0;

  form_cupon:FormGroup = this.fb.group({
    cupon:['',Validators.required]
  })


  constructor(private fb: FormBuilder, private CategoriasService: CategoriasService) { }

  ngOnInit(): void {

    /*
    console.log("total carrito detalles");
    console.log(this.totalcarroarray);*/

    let index = JSON.parse(localStorage.getItem('index')!);
    let carrito: Carrito[] =  JSON.parse(localStorage.getItem('carrito')!);
    var cdescuento = <number>carrito[index]['cupon_descuento'];
    
    if(cdescuento>0){
      this.validezcupon = 1;
    }else{
      this.validezcupon = 0;
    }


  }

  validarcupon(){

    if(this.form_cupon.invalid){
      this.form_cupon.markAllAsTouched()
      return;
    }

    let index = JSON.parse(localStorage.getItem('index')!);
    let carrito: Carrito[] =  JSON.parse(localStorage.getItem('carrito')!);
    const producto = carrito[index].producto;

    const cupon = this.form_cupon.value.cupon;
    //console.log(producto.subcategoria_id);

    
    this.CategoriasService.validarcupon(cupon,producto.subcategoria_id).subscribe( resp => {

      console.log(resp);
      if(resp['monto']!=0){
       
        if(resp['tipo_descuento']==1){ //monto fijo
           carrito[index].cupon_descuento = resp['monto'];
           
        }else if(resp['tipo_descuento']==2){ //porcentaje de descuento
          const descc = (resp['monto'] * producto.ahorro)/100;
          carrito[index].cupon_descuento = descc;
        }

        localStorage.setItem('carrito',JSON.stringify(carrito));
        this.validezcupon = 1;

      }else{

        this.validezcupon = 2;

      }

      let productoscarro = this.CategoriasService.calculototalcarro();
      this.totalcarrod.emit(productoscarro);


    });

  }

  quitarCupon(){

    this.form_cupon.patchValue({
        cupon: ''
    });

    let index = JSON.parse(localStorage.getItem('index')!);
    let carrito: Carrito[] =  JSON.parse(localStorage.getItem('carrito')!);
    carrito[index].cupon_descuento = 0;
    localStorage.setItem('carrito',JSON.stringify(carrito));
    this.validezcupon = 0;

    let productoscarro = this.CategoriasService.calculototalcarro();
    this.totalcarrod.emit(productoscarro);
  }



}
