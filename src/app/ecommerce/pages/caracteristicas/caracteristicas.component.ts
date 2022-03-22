import { Component, Input, OnInit, Output, EventEmitter, ElementRef, ViewChild} from '@angular/core';
import { Subcategorias, Productos } from '../../interfaces/ecommerce.interface';
import { CategoriasService } from '../../services/categorias.service';

@Component({
  selector: 'app-caracteristicas',
  templateUrl: './caracteristicas.component.html',
  styles: [
  ]
})
export class CaracteristicasComponent implements OnInit {


  seleccionado:number = 0;
  id_subcategoria:number = 0;
  productos: Productos[] = [];

  scrollPlanes: boolean = false;

  @Input() subcategorias!:Subcategorias[];
  @Output() getproducto: EventEmitter<Productos[]> = new EventEmitter();

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
