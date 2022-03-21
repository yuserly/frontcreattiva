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
  cuponAplicado:any = '';
  

  form_cupon:FormGroup = this.fb.group({
    cupon:['',Validators.required]
  })


  constructor(private fb: FormBuilder, private CategoriasService: CategoriasService) { }

  ngOnInit(): void {

    if (localStorage.getItem('carrito')) {

      let index = JSON.parse(localStorage.getItem('index')!);
      let carrito: Carrito[] =  JSON.parse(localStorage.getItem('carrito')!);
      let cdescuento:number = 0;
      //var cdescuento = <number>carrito[index]['cupon_descuento'];

      carrito.map((p, i) => {
        
        if(p['cupon_descuento']!=0){
          cdescuento = <number>p['cupon_descuento'];
        }

      });

      if(cdescuento!=0){
        this.validezcupon = 1;
      }else{
        this.validezcupon = 0;
      }

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
    let productoexiste = 0; //contador de coincidencias

    const cupon = this.form_cupon.value.cupon;
    //console.log(producto.subcategoria_id);
    console.log(carrito);
    
    this.CategoriasService.validarcupon(cupon).subscribe( resp => {


      if(resp['monto']!=0){

        //validar que haya sido ingresado algún producto compatible con el cupon
        resp['subcategorias'].forEach((element:any) => {

          console.log(element);

          
          carrito.forEach((element2) => {

            if(element2.producto.subcategoria_id==element.subcategoria_id){
              productoexiste++;
            }

          });
          

        });
        //************
        
        if(productoexiste>0){

          if(resp['tipo_descuento']==1){ //monto fijo
             carrito[0].cupon_descuento = resp['monto'];
             
          }else if(resp['tipo_descuento']==2){ //porcentaje de descuento
            const descc = (resp['monto'] * producto.ahorro)/100;
            carrito[0].cupon_descuento = descc;
          }

          localStorage.setItem('carrito',JSON.stringify(carrito));

          this.validezcupon = 1;
          this.cuponAplicado = cupon;

        }else{

          this.validezcupon = 2;

        }


      }else{

        this.validezcupon = 2;

      }

      let productoscarro = this.CategoriasService.calculototalcarro();
      this.totalcarrod.emit(productoscarro);
      

    /*

      if(resp['monto']!=0){

        //validar que haya sido ingresado algún producto compatible con el cupon
        resp['subcategorias'].forEach((element) => {

          if(producto.subcategoria_id==element.subcategoria_id){
            productoexiste = true;
          }

        });
        //************

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
    */

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
