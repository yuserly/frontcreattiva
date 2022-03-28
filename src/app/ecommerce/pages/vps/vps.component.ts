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
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-vps',
  templateUrl: './vps.component.html',
  styles: [],
})
export class VpsComponent implements OnInit {


  //owl
  owl_sistemaoperativo: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    margin: 10,
    responsive: {
      0: {
        items: 1
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

  //owl
  owl_licencias: OwlOptions = {
    loop: false,
    margin: 10,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1,
        autoWidth: true
      },
      400: {
        items: 4
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

  select: number = 0;
  licencias: Productos[] = [];
  iconoLicencia:string = '';
  producto!:Productos;
  errorSO:number = 0;
  invalidAdmin:number = 0;
  invalidLicencia:number = 0;

  //variable de validación Licencias
  mostrarLicencias:boolean = false;

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
  @Input() vpsnum!:number;
  @Output() totalcarrovps: EventEmitter<TotalCarro> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private CategoriasService: CategoriasService
  ) {}

  ngOnInit(): void {

    let index = JSON.parse(localStorage.getItem('index')!);

    let carrito: Carrito[] =  JSON.parse(localStorage.getItem('carrito')!);

    this.producto = carrito[index].producto;

    let os: any = carrito[index].sistemaoperativo;
    let version: any = carrito[index].versionsistema;
    let administrar: any = carrito[index].administrar;
    let licencia: any= '';

    //marcar OS guardado en carro
    this.sistemaOperativo.map((p, i) => {
      if (p.id_os == os) {
        p['active'] = os;
      } else {
        p['active'] = 0;
      }

    });
    //*************************** */

    //mostrar y/o ocultar panel de licencias
    if(os==1 || os==4 || os==5){
      if(version>0){
        this.mostrarLicencias = true;
      }else{
        this.mostrarLicencias = false;
      }
    }else{
      this.mostrarLicencias = false;
    }


    //obtener licencias del carrito (Cpanel y Windows)
    carrito.map((p, i) => {
      if (p.producto.subcategoria_id == 29 || p.producto.subcategoria_id == 23) {
         licencia = p.producto.id_producto;
      }
    });

    //asignar valores del carrito a variables
    this.seleccion.os = os;
    this.seleccion.version = version;
    this.seleccion.administrar = administrar;
    this.seleccion.licencia = licencia;
    //******************/

    this.form.reset(this.seleccion);

    if(this.producto.subcategoria_id == 9 || this.producto.subcategoria_id == 11 || this.producto.subcategoria_id == 12){
    
      // el 29 es el id de las subcategoria a las que pertenece las licencias cpanel
      this.CategoriasService.getproductos(29).subscribe((resp) => {
        this.licencias = resp;
        this.iconoLicencia = 'fab fa-cpanel';
        
      });

    }else if(this.producto.subcategoria_id == 10 || this.producto.subcategoria_id == 13){
      // subcategoria 19 tipo de producto 8 licencias sql
      this.CategoriasService.getproductosxtipo(23,8).subscribe((resp) => {
        this.licencias = resp;
        this.iconoLicencia = 'fa-windows fab';
      });
    }


  }
  sistemaopactive(item: SistemaOperativo) {
 
    this.select = this.form.value.os; //id Sistema operativo

    this.sistemaOperativo.map((p, i) => {
      if (p.id_os == item.id_os) {
        p['active'] = this.form.value.os;
      } else {
        p['active'] = 0;
      }

    });

    //Restablecer opciones con nuevo OS seleccionado
    this.seleccion.os = this.form.value.os;
    this.seleccion.version = '';
    this.seleccion.administrar = '';
    this.seleccion.licencia = '';
    //************************* */

    this.form.reset(this.seleccion);

    let index = JSON.parse(localStorage.getItem('index')!);
    let carrito: Carrito[] = JSON.parse(localStorage.getItem('carrito')!);

    carrito[index].sistemaoperativo = this.form.value.os;
    carrito[index].versionsistema = 0;
    
    //Mostrar licencias solo a Centos y Windows
    if(this.form.value.os==1 || this.form.value.os==4 || this.form.value.os==5){
      this.mostrarLicencias = true;
    }else{ 
      this.mostrarLicencias = false;
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    let productoscarro = this.CategoriasService.calculototalcarro();
    this.totalcarrovps.emit(productoscarro);
    
    

    /*
    this.seleccion.version = '';
    this.seleccion.licencia = '';*/
  }

  licenciaactive(idlicencia: number) {

    console.log("idlicencia: "+idlicencia);

    let index = JSON.parse(localStorage.getItem('index')!);

    let carrito: Carrito[] = JSON.parse(localStorage.getItem('carrito')!);
    
    //this.select = this.form.value.licencia;

    let producto!: Productos;

    /*
      carrito.map((p, i) => {
        
        if (p.producto.subcategoria_id == 23) {
          carrito.splice(i, 1);
        }else if(p.producto.subcategoria_id == 29){
          carrito.splice(i, 1);
        }
      });
      */
      this.licencias.map((p, i) => {
        if (p.id_producto == idlicencia) {
          producto = p;
        }
      });

      let periodoselect = 0;

      this.CategoriasService.getperiodos(idlicencia).subscribe(
        (resp) => {

          resp.forEach((element) => {
            if(element.preseleccionado==1){
              periodoselect = element.id_periodo;
            }

          });

          carrito.push({
            producto: producto,
            periodo: periodoselect,
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

  }

  guardar() {
    let index = JSON.parse(localStorage.getItem('index')!);

    let carrito: Carrito[] = JSON.parse(localStorage.getItem('carrito')!);
    

    if (this.form.value.os != '') {

      carrito[index].sistemaoperativo = this.form.value.os;

    } else {
      carrito[index].sistemaoperativo = 0;
    }

    console.log("verwsion de so: "+this.form.value.version);

    if (this.form.value.version != '' || this.form.value.version != 0) {

      //OS Centos - id = 1
      if(this.form.value.os==1 || this.form.value.os==4 || this.form.value.os==5){
        this.mostrarLicencias = true;
        console.log("mostrar licencias");
      }else{
        this.mostrarLicencias = false;
        console.log("ocultar licencias");
      }

      carrito[index].versionsistema = this.form.value.version;
    } else {
      this.mostrarLicencias = false;
      carrito[index].versionsistema = 0;
    }

    if (this.form.value.administrar != '') {
      carrito[index].administrar = this.form.value.administrar;
    }

    //Validar licencias Cpanel
    if (this.form.value.licencia != '') {
      let producto!: Productos;

      carrito.map((p, i) => {
        
        if (p.producto.subcategoria_id == 23) {
          carrito.splice(i, 1);
        }else if(p.producto.subcategoria_id == 29){
          carrito.splice(i, 1);
        }
      });

      this.licencias.map((p, i) => {
        if (p.id_producto == this.form.value.licencia) {
          producto = p;
        }
      });

      let periodoselect = 0;

      this.CategoriasService.getperiodos(this.form.value.licencia).subscribe(
        (resp) => {

          resp.forEach((element) => {
            if(element.preseleccionado==1){
              periodoselect = element.id_periodo;
            }

          });


          carrito.push({
            producto: producto,
            periodo: periodoselect,
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
        if(carrito[index].producto.subcategoria.id_subcategoria==10 || carrito[index].producto.subcategoria.id_subcategoria==13){

          //validar si tiene SQL Server
          let licencia: any= '';

          carrito.map((p, i) => {
            if (p.producto.subcategoria_id == 23) {
              licencia = p.producto.id_producto;
            }
          });

          if(licencia!= ''){
              this.invalidLicencia = 1;
              return true;
            }else{
              this.invalidLicencia = 2;
              let el = document.getElementById("invalidLicencia");
              if(el){el.scrollIntoView({ behavior: 'smooth' });}
              return false;
            }

        //Si son VPS Linux
        }else{ //VPS Linux

          if(carrito[index].versionsistema==1 || carrito[index].versionsistema==2 || carrito[index].versionsistema==3 || carrito[index].versionsistema==4){
            //validar si tiene licencia  cpanel
            let licencia: any= '';

            carrito.map((p, i) => {
              if (p.producto.subcategoria_id == 29) {
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
              let el = document.getElementById("invalidLicencia");
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
