import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
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
  hayproductos:boolean = false;
  disponiblebuscado:boolean = false;
  totalcarroarray!: TotalCarro;
  statusDominioBuscado:boolean = false;
  dominiopAgregado:boolean = false;
  mostrarContinuarLink:boolean = true;


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

      this.hayproductos = true;

      let index = JSON.parse(localStorage.getItem('index')!);


      let carrito: Carrito[] = JSON.parse(localStorage.getItem('carrito')!);
      carrito.map((p, i) => {
        if (p.producto.subcategoria_id == 31) {

            carrito.splice(i);
        }
        return p;
      });

      carrito =  JSON.parse(localStorage.getItem('carrito')!);

      this.dominioscarrito = carrito;

      let productoscarro = this.CategoriasService.calculototalcarro();

      this.totalcarroarray = productoscarro;

      this.totalcarrod.emit(productoscarro);


    }else{
      this.hayproductos = false;
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

    let el = document.getElementById("scrollb");

    if(el){el.scrollIntoView({ behavior: 'smooth' });}

    this.dominiopAgregado = false;

    this.statusDominioBuscado = false;

    this.mostrarPreload = true;

    const dominio = this.form.value.dominio;

    const extension = this.form.value.extension;

    this.dominiobuscado = `${dominio}.${extension}`;

    this.DominiosService.getdominios(dominio, extension).subscribe( resp => {

      console.log(resp.data.results);

      resp.data.results.forEach((element) => {

        this.dominioscarrito.forEach((element2) => {

          if(element.domain===element2.dominio){

            element.agregado = true;

          }
          if(element2.dominio===this.dominiobuscado){
            this.dominiopAgregado = true;
          }

        });

        if(element.domain==this.dominiobuscado){

          if(element.status=='free'){

             this.statusDominioBuscado = true;

          }else{

             this.statusDominioBuscado = false;

          }
         
        }


      });

        this.dominios = resp.data.results;

        //console.log(this.dominios)
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
            cantidad: 1,
            cupon_descuento: 0

          });

          localStorage.setItem('carrito', JSON.stringify(carro));

          let productoscarro = this.CategoriasService.calculototalcarro();

          this.totalcarrod.emit(productoscarro);

          this.totalcarroarray = productoscarro;

          item.agregado = true;

          carro = JSON.parse(localStorage.getItem('carrito')!);

          this.hayproductos = true;

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
            cantidad: 1,
            cupon_descuento: 0

          });

          localStorage.setItem('carrito', JSON.stringify(carro));

          let productoscarro = this.CategoriasService.calculototalcarro();

          this.totalcarrod.emit(productoscarro);

          this.totalcarroarray = productoscarro;

          item.agregado = true;

          carro = JSON.parse(localStorage.getItem('carrito')!);

          this.hayproductos = true;

          //this.dominioscarrito.emit(carro);


        }
      );
    }

    

    
  }

  addAllDomains(){



    if (localStorage.getItem('carrito')) {
      let carro: Carrito[] = JSON.parse(localStorage.getItem('carrito')!);
      

      let existd = false;


      this.dominios.forEach((element) => {

          this.dominioscarrito.forEach((element2) => {

            if(element2.dominio===element.domain){
              existd = true;
            }

          })
          if(element.status=='free' && !existd){

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

                element.agregado = true;

                carro = JSON.parse(localStorage.getItem('carrito')!);

                this.totalcarrod.emit(productoscarro);

                this.totalcarroarray = productoscarro;


              }
            );

            this.hayproductos = true;

          }
          console.log("El dominio: "+element.domain+" es: "+existd);
          existd = false;

      })

    } else {
      let carro: Carrito[] = [];
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

            //this.totalcarro.emit(productoscarro);

            element.agregado = true;

            carro = JSON.parse(localStorage.getItem('carrito')!);

            //this.dominioscarrito.emit(carro);

            this.totalcarrod.emit(productoscarro);

            this.totalcarroarray = productoscarro;


          }
        );

      }

      this.hayproductos = true;

    });

    }

    this.dominiopAgregado = true;


    

  }

  agregardominiobuscado(){

    let existd = false;

    this.dominios.forEach((element) => {

      existd = this.validarDominioBuscado();

      //Si dominio esta disponible y no esta en el carrito
      if(element.domain===this.dominiobuscado && element.status=='free' && !existd){


        if (localStorage.getItem('carrito')) {
          let carro: Carrito[] = JSON.parse(localStorage.getItem('carrito')!);
          
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

              element.agregado = true;

              carro = JSON.parse(localStorage.getItem('carrito')!);

              this.totalcarrod.emit(productoscarro);

              this.totalcarroarray = productoscarro;


            }
          );

        } else {
          let carro: Carrito[] = [];
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

                //this.totalcarro.emit(productoscarro);

                element.agregado = true;

                carro = JSON.parse(localStorage.getItem('carrito')!);

                //this.dominioscarrito.emit(carro);

                this.totalcarrod.emit(productoscarro);

                this.totalcarroarray = productoscarro;


              }
            );

        }

        this.dominiopAgregado = true;

      }
    })

  }

  validarDominioBuscado():boolean{


    let existd = false;
    this.dominios.forEach((element) => {

      this.dominioscarrito.forEach((element2) => {

        if(element2.dominio===this.dominiobuscado){
          existd = true;
        }

      })

    });

    return existd;

  }


  validarcarro(){


        this.router.navigate(['/carrito']);

  }

}
