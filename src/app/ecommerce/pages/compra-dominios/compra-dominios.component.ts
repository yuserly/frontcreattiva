import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DominiosService } from '../../services/dominios.service';
import { Result, PrecioDominios } from '../../interfaces/dominios.interfaces';
import { TotalCarro, Carrito } from '../../interfaces/ecommerce.interface';
import { CategoriasService } from '../../services/categorias.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compra-dominios',
  templateUrl: './compra-dominios.component.html'
})
export class CompraDominiosComponent implements OnInit {

  dominios: Result[] = [];
  dominioscarrito:Carrito[] = [];
  dominiobuscado:string = '';
  aplicarCupon:number = 1;
  mostrarPreload:boolean = false;
  haydominios:boolean = false;
  totalcarroarray!: TotalCarro;

  form:FormGroup = this.fb.group({
    dominio:['',Validators.required],
    extension:['cl',Validators.required]
  })

  seleccion = {
    dominio: '',
    extension:''
  }

  @Output() totalcarrod: EventEmitter<TotalCarro> = new EventEmitter();

  constructor(private router: Router, private DominiosService:DominiosService, private fb: FormBuilder, private CategoriasService: CategoriasService) { }

  ngOnInit(): void {

    if (localStorage.getItem('carrito')) {


      let index = JSON.parse(localStorage.getItem('index')!);


      let carrito: Carrito[] = JSON.parse(localStorage.getItem('carrito')!);
      carrito.map((p, i) => {
        if (p.producto.subcategoria_id == 26) {

            carrito.splice(i);
        }
        return p;
      });

      carrito =  JSON.parse(localStorage.getItem('carrito')!);

      this.dominioscarrito = carrito;

      let productoscarro = this.CategoriasService.calculototalcarro();

      this.totalcarroarray = productoscarro;

      this.totalcarrod.emit(productoscarro);


    }


  }

  totalcarro(carrito:TotalCarro){

    this.totalcarroarray = carrito;

  }
  
  buscardominio(){

    this.dominios = [];

    if(this.form.invalid){
      this.form.markAllAsTouched()
      return;
    }

    this.mostrarPreload = true;
    const dominio = this.form.value.dominio;
    const extension = this.form.value.extension;

    this.dominiobuscado = `${dominio}.${extension}`;

    //console.log(this.dominiobuscado);

    this.DominiosService.getdominios(dominio, extension).subscribe( resp => {


      resp.data.results.forEach((element) => {

        this.dominioscarrito.forEach((element2) => {

          if(element.domain===element2.dominio){
            element.agregado = true;
          }

        });


      });

        this.dominios = resp.data.results;

        console.log(this.dominios)
     })

  }

  agregarcarro(item: Result) {


    if (localStorage.getItem('carrito')) {
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

          this.totalcarrod.emit(productoscarro);

          this.totalcarroarray = productoscarro;

          item.agregado = true;

          carro = JSON.parse(localStorage.getItem('carrito')!);

          //this.dominioscarrito.emit(carro);


        }
      );


    } else {
      let carro: Carrito[] = [];

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

          this.totalcarrod.emit(productoscarro);

          this.totalcarroarray = productoscarro;

          item.agregado = true;

          carro = JSON.parse(localStorage.getItem('carrito')!);

          //this.dominioscarrito.emit(carro);


        }
      );
    }

    

    
  }

  consultarDominiosBuscados():boolean{
    let index = JSON.parse(localStorage.getItem('index')!);

    let carrito: Carrito[] = JSON.parse(localStorage.getItem('carrito')!);

    let cont = 0;

    carrito.map((p, i) => {
      if (p.producto.subcategoria_id == 26) {
        cont++;
      }
      return p;
    });

    if(cont>0){
      return true;
    }else{
      return false;
    }
  }

  validarcarro(){


        this.router.navigate(['/carrito']);

  }

}
