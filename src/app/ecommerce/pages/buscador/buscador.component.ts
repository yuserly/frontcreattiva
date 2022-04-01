import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Categorias,
  Subcategorias,
  Carrito,
  Productos
} from '../../interfaces/ecommerce.interface';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriasService } from '../../services/categorias.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html'
})
export class BuscadorComponent implements OnInit {

  productosbuscados: Productos[] = [];
  textsearch: string = '';
  form:FormGroup = this.fb.group({
    textobuscar: [
      '',
      [Validators.required],
    ]
  });
  @Output() productosbusc: EventEmitter<Productos[]> = new EventEmitter();
  constructor(private categoriasServices: CategoriasService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {

    //limpiar variable de busqueda
    if (localStorage.getItem('resultados_busqueda')) {
      localStorage.removeItem('resultados_busqueda');
    }


  }

  busquedageneral(){
    
    if(this.form.invalid){
      this.form.markAllAsTouched()
      return;
    }

    let resultados:any = [];

    if (localStorage.getItem('resultados_busqueda')) {

      this.productosbuscados = JSON.parse(localStorage.getItem('resultados_busqueda')!);

    } else {

      this.productosbuscados = [];

    }

    let textoBusqueda = this.form.value.textobuscar;
    localStorage.setItem('textobuscado', JSON.stringify(textoBusqueda));

    this.categoriasServices.getProductosCoincidentes(textoBusqueda).subscribe((productosEncontrados) => {
      console.log(productosEncontrados);

      this.productosbuscados = productosEncontrados;

      localStorage.setItem('resultados_busqueda', JSON.stringify(this.productosbuscados));

      console.log("nuevos productos");
      console.log(this.productosbuscados);

      this.productosbusc.emit(this.productosbuscados);

      this.router.navigate(['/resultados-busqueda']);
      
    });

  }

}
