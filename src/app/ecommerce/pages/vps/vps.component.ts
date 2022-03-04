import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  SistemaOperativo,
  Productos,
  Carrito,
  TotalCarro,
} from '../../interfaces/ecommerce.interface';
import { CategoriasService } from '../../services/categorias.service';

@Component({
  selector: 'app-vps',
  templateUrl: './vps.component.html',
  styles: [],
})
export class VpsComponent implements OnInit {
  select: number = 1;
  licencias: Productos[] = [];
  producto!:Productos;
  errorSO:number = 0;
  invalidAdmin:number = 0;
  invalidLicencia:number = 0;

  form: FormGroup = this.fb.group({
    os: ['', Validators.required],
    version: ['', Validators.required],
    administrar: ['', Validators.required],
    licencia: ['', ''],
  });

  seleccion = {
    os: '',
    version:'',
    administrar:'',
    licencia:''
  }

  @Input() sistemaOperativo!: SistemaOperativo[];
  @Output() totalcarrovps: EventEmitter<TotalCarro> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private CategoriasService: CategoriasService
  ) {}

  ngOnInit(): void {

    let index = JSON.parse(localStorage.getItem('index')!);

    let carrito: Carrito[] =  JSON.parse(localStorage.getItem('carrito')!);

    this.producto = carrito[index].producto;

    console.log("producto");
    console.log(this.producto);
    console.log("...");

    let os: any = carrito[index].sistemaoperativo;
    let version: any = carrito[index].versionsistema;
    let administrar: any = carrito[index].administrar;
    let licencia: any= '';

    carrito.map((p, i) => {
      if (p.producto.subcategoria_id == 24) {
         licencia = p.producto.id_producto;
      }
    });



    this.seleccion.os = os;
    this.seleccion.version = version;
    this.seleccion.administrar = administrar;
    this.seleccion.licencia = licencia;

    this.form.reset(this.seleccion);

    console.log("productos licencias");
    console.log(this.producto);
    console.log("---------------------");

    if(this.producto.subcategoria_id == 6 || this.producto.subcategoria_id == 8 || this.producto.subcategoria_id == 9){
    
      // el 24 es el id de las subcategoria a las que pertenece las licencias cpanel
      this.CategoriasService.getproductos(25).subscribe((resp) => {
        this.licencias = resp;
      });

    }else if(this.producto.subcategoria_id == 7 || this.producto.subcategoria_id == 10){
      // subcategoria 19 tipo de producto 8 licencias sql
      this.CategoriasService.getproductosxtipo(19,8).subscribe((resp) => {
        console.log(resp)
        this.licencias = resp;
      });
    }







  }
  sistemaopactive(item: SistemaOperativo) {
    this.select = this.form.value.os;
    this.sistemaOperativo.map((p, i) => {
      if (p.id_os == item.id_os) {
        p['active'] = this.form.value.os;
      } else {
        p['active'] = 0;
      }
    });
  }

  guardar() {
    let index = JSON.parse(localStorage.getItem('index')!);

    let carrito: Carrito[] = JSON.parse(localStorage.getItem('carrito')!);

    if (this.form.value.os != '') {
      carrito[index].sistemaoperativo = this.form.value.os;
    } else {
      carrito[index].sistemaoperativo = 0;
    }

    if (this.form.value.version != '') {
      carrito[index].versionsistema = this.form.value.version;
    } else {
      carrito[index].versionsistema = 0;
    }

    if (this.form.value.administrar != '') {
      carrito[index].administrar = this.form.value.administrar;
    }

    console.log("licencia: ");
    console.log(this.form.value.licencia);

    if (this.form.value.licencia != '') {
      let producto!: Productos;

      carrito.map((p, i) => {
        if (p.producto.subcategoria_id == 25) {
          carrito.splice(i, 1);
        }else if(p.producto.tipo_producto_id == 8){
          carrito.splice(i, 1);
        }
      });

      this.licencias.map((p, i) => {
        if (p.id_producto == this.form.value.licencia) {
          producto = p;
        }
      });

      this.CategoriasService.getperiodos(this.form.value.licencia).subscribe(
        (resp) => {
          carrito.push({
            producto: producto,
            periodo: 4,
            dominio: '',
            sistemaoperativo: 0,
            versionsistema: 0,
            administrar: 0,
            ip: '',
            periodos: resp
          });

          localStorage.setItem('carrito', JSON.stringify(carrito));
          let productoscarro = this.CategoriasService.calculototalcarro();
          this.totalcarrovps.emit(productoscarro);
        }
      );
    } else {
      this.eliminarproducto(carrito);
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));

  }

  eliminarproducto(carrito: Carrito[]) {
    carrito.map((p, i) => {
      if (p.producto.subcategoria_id == 24) {
        carrito.splice(i, 1);
      }else if(p.producto.tipo_producto_id == 8){
        carrito.splice(i, 1);
      }

      return p;
    });

    localStorage.setItem('carrito', JSON.stringify(carrito));
    let productoscarro = this.CategoriasService.calculototalcarro();
    this.totalcarrovps.emit(productoscarro);
  }

  validarFormularios():boolean {

    let index = JSON.parse(localStorage.getItem('index')!);

    let carrito: Carrito[] = JSON.parse(localStorage.getItem('carrito')!);

    console.log("datos del plan");
    console.log(carrito[index].administrar);


    if(carrito[index].sistemaoperativo!= 0){
      this.errorSO = 1;

      if(carrito[index].versionsistema!= 0){

        //Si son VPS Windows
        if(carrito[index].producto.subcategoria.id_subcategoria==7){

          //validar si tiene SQL Server
          let licencia: any= '';

          carrito.map((p, i) => {
            if (p.producto.subcategoria_id == 19) {
              licencia = p.producto.id_producto;
            }
          });

          if(licencia!= ''){
              this.invalidLicencia = 1;
              return true;
            }else{
              this.invalidLicencia = 2;
              let el = document.getElementById("invalidSqlSrv");
              if(el){el.scrollIntoView({ behavior: 'smooth' });}
              return false;
            }

        //Si son VPS Linux
        }else{ //VPS Linux

          if(carrito[index].versionsistema==3 || carrito[index].versionsistema==4){
            //validar si tiene licencia 
            let licencia: any= '';

            carrito.map((p, i) => {
              if (p.producto.subcategoria_id == 25) {
                licencia = p.producto.id_producto;
              }
            });

            if(licencia!= ''){
              this.invalidLicencia = 1;
              //1 quiere licencia, 2 no quiere licencia
              if(carrito[index].administrar== 1 || carrito[index].administrar== 2){
                this.invalidAdmin = 1;
                if(carrito[index].administrar== 2){ carrito[index].administrar=0; }
                return true;
              }else{
                this.invalidAdmin = 2;
                let el = document.getElementById("invalidAdmin");
                if(el){el.scrollIntoView({ behavior: 'smooth' });}
                return false;
              }

            }else{
              this.invalidLicencia = 2;
              let el = document.getElementById("invalidSO");
              if(el){el.scrollIntoView({ behavior: 'smooth' });}
              return false;
            }

          }else{
            //no hace falta que tenga licencia cpanel
            this.invalidLicencia = 1;

            if(carrito[index].administrar!= 0){
                this.invalidAdmin = 1;
                return true;
              }else{
                this.invalidAdmin = 2;
                let el = document.getElementById("invalidAdmin");
                if(el){el.scrollIntoView({ behavior: 'smooth' });}
                return false;
              }

          }

        }

      }else{
        this.errorSO = 2;
        let el = document.getElementById("invalidSO");
        if(el){el.scrollIntoView({ behavior: 'smooth' });}
        return false;
      }

    }else{
      this.errorSO = 2;
      let el = document.getElementById("invalidSO");
      if(el){el.scrollIntoView({ behavior: 'smooth' });}
      return false;
    }

  }

}
