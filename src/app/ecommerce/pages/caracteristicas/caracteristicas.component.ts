import { Component, Input, OnInit, Output, EventEmitter, ElementRef, ViewChild} from '@angular/core';
import { Subcategorias, Productos } from '../../interfaces/ecommerce.interface';
import { CategoriasService } from '../../services/categorias.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-caracteristicas',
  templateUrl: './caracteristicas.component.html',
  styles: [
  ]
})
export class CaracteristicasComponent implements OnInit {


  //owl
  owl_subcategorias: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    margin: 10,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 2
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


  seleccionado:number = 0;
  id_subcategoria:number = 0;
  productos: Productos[] = [];

  scrollPlanes: boolean = false;

  @Input() subcategorias!:Subcategorias[];
  @Output() getproducto: EventEmitter<Productos[]> = new EventEmitter();
  @Output() statusmenu: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('subfocoplanes') subfocoplanes!: ElementRef;

  constructor(private categoriasServices: CategoriasService,) { }


  ngOnInit(): void {
    this.scrollPlanes = false;
    setTimeout(() => {
      this.buscarproducto(this.subcategorias[0].id_subcategoria);

    }, 1000);

  }

  seleccionarcategoria(id:number,id_subcategoria:number){

    this.subcategorias.map((p,i) => {
      if(i == id){
        p["active"] = true;
      }else{
        p["active"] = false;
      }
    })

    if(id_subcategoria != 31){
      this.buscarproducto(id_subcategoria);
    }else{
      this.productos = [];
    }


    this.statusmenu.emit(false);


  }

  buscarproducto(id: number) {

    this.categoriasServices.getproductos(id).subscribe((productos) => {
      this.productos = productos;
      this.getproducto.emit(this.productos)
    });

    if(this.scrollPlanes){
      this.subfocoplanes.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    

    this.scrollPlanes = true;
  }

}
