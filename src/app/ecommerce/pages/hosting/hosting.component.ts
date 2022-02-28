import { DominiosService } from './../../services/dominios.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Productos, Periodo, Carrito, TotalCarro, SistemaOperativo } from '../../interfaces/ecommerce.interface';
import { CategoriasService } from '../../services/categorias.service';
import { Router } from '@angular/router';
import { DominioComponent } from './../dominio/dominio.component';
import { VpsComponent } from '../vps/vps.component';
import { PeriodoComponent } from '../periodo/periodo.component';

@Component({
  selector: 'app-hosting',
  templateUrl: './hosting.component.html',
  styles: [
  ]
})
export class HostingComponent implements OnInit {

//validación de boton continuar
@ViewChild(DominioComponent) DominioView!: DominioComponent;
@ViewChild(VpsComponent) VpsView!: VpsComponent;
@ViewChild(PeriodoComponent) PeriodoView!: PeriodoComponent;
//*************** */

  producto!:Productos;
  periodos:Periodo[] = [];
  carrito:Carrito[] = [];
  totalcarroarray!: TotalCarro;
  sistemaOperativo: SistemaOperativo[] = [];

  // lo usamos para colocarle el numero a los pasos de la configuracion

  dominionum:number = 0;
  periodonum:number = 0;



  constructor(private categoriasServices: CategoriasService, private router: Router, private DominiosService: DominiosService) { }

  ngOnInit(): void {

    let index = JSON.parse(localStorage.getItem('index')!);

    let carrito: Carrito[] =  JSON.parse(localStorage.getItem('carrito')!);

    this.carrito = JSON.parse(localStorage.getItem('carrito')!);

    this.producto = carrito[index].producto;

    this.getperiodos(this.producto.id_producto)

    if(this.producto.subcategoria.categoria_id == 1){

      this.dominionum = 1;
      this.periodonum = 2;

    }

    if(this.producto.subcategoria.categoria_id == 2){

      this.dominionum = 1;
      this.periodonum = 4;

    }

    if(this.producto.subcategoria.categoria_id == 3 ||
      this.producto.subcategoria.categoria_id == 4
     ){

      this.periodonum = 1;

    }

    if(this.producto.subcategoria_id == 17 //Google Workspace
     ){

      this.dominionum = 1;
      this.periodonum = 3;

    }
     

    if(this.producto.subcategoria_id == 6 || this.producto.subcategoria_id == 8 || this.producto.subcategoria_id == 9){

      this.getos('linux');

    }else if(this.producto.subcategoria_id == 7 || this.producto.subcategoria_id == 10){
      this.getos('windows');
    }

    this.itemsCarrito();

    window.scroll(0,0);


  }

  getperiodos(id:number){

    this.categoriasServices.getperiodos(id).subscribe( resp => {

      this.periodos = resp;

      console.log(resp)

    })


  }

  getos(tipo:string){

    this.categoriasServices.getsistemasoperativo(tipo).subscribe( resp => {

      this.sistemaOperativo = resp;

    })
  }

  totalcarro(carrito:TotalCarro){

    this.totalcarroarray = carrito;

  }

  validarcarro(){


    let index = JSON.parse(localStorage.getItem('index')!);

    let carrito: Carrito[] =  JSON.parse(localStorage.getItem('carrito')!);

    this.carrito = JSON.parse(localStorage.getItem('carrito')!);

    this.producto = carrito[index].producto;
    console.log("datos");
    console.log(this.producto);

    //validación de hosting
    if( this.producto.subcategoria.categoria.id_categoria == 1){

        console.log("validar dominios");
        if(this.validarFormDominiosComponent()){
          if(this.validarFormPeriodoComponent()){
            this.router.navigate(['/carrito']);
          }
          
        }
        
    }

    //validación de VPS
    else if( /*this.producto.subcategoria_id == 1 ||
        this.producto.tipo_producto_id == 1 ||*/
        this.producto.subcategoria_id == 6 ||
        this.producto.subcategoria_id == 7 ||
        this.producto.subcategoria_id == 8 ||
        this.producto.subcategoria_id == 9 ||
        this.producto.subcategoria_id == 10 ){

        console.log("validar vps");
        console.log("respuesta de validación: "+this.validarFormDominiosComponent());
        if(this.validarFormDominiosComponent()){
          
          if(this.validarFormVpsComponent()){

            if(this.validarFormPeriodoComponent()){
              this.router.navigate(['/carrito']);
            }

          }
          
        }

    }

    //validación de licencias
    else if(this.producto.subcategoria_id == 17){

      if(this.validarFormDominiosComponent()){

        if(this.validarFormPeriodoComponent()){

          this.router.navigate(['/carrito']);

        }
        
      }

    }
    //Validación de resto de planes (solo periodo)
    else{

      if(this.validarFormPeriodoComponent()){
        this.router.navigate(['/carrito']);
      }

    }

   

  }

  itemsCarrito(){
    let index = JSON.parse(localStorage.getItem('index')!);

    let carrito: Carrito[] =  JSON.parse(localStorage.getItem('carrito')!);

    this.DominiosService.totalCarro = carrito.length;
  }

  validarFormDominiosComponent():boolean {

    return this.DominioView.validarFormularios();

  }

  validarFormVpsComponent(): boolean {

    return this.VpsView.validarFormularios();

  }

  validarFormPeriodoComponent(): boolean {

    return this.PeriodoView.validarFormularios();

  }


}
