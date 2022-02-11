import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Categorias,
  Productos,
  Subcategorias,
  Periodo,
  TotalCarro,
  ProductoCarro,
  Carrito,
  SistemaOperativo,
} from '../interfaces/ecommerce.interface';
import { Paises } from '../interfaces/paises.interfaces';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  private urlBase: string = environment.urlBase;
  private periodo!: Periodo;

  constructor(private http: HttpClient) {}

  getCategorias(): Observable<Categorias[]> {
    return this.http.get<Categorias[]>(`${this.urlBase}/getcategorias`);
  }

  getsubcategoria(id: number): Observable<Subcategorias[]> {
    return this.http.get<Subcategorias[]>(
      `${this.urlBase}/getsubcategorias/${id}`
    );
  }

  getproductos(id: number): Observable<Productos[]> {
    return this.http.get<Productos[]>(`${this.urlBase}/getproductos/${id}`);
  }

  getproductosxtipo(id: number, tipo: number): Observable<Productos[]> {
    return this.http.get<Productos[]>(
      `${this.urlBase}/getproductosxtipo/${id}/${tipo}`
    );
  }

  getperiodos(id: number): Observable<Periodo[]> {
    return this.http.get<Periodo[]>(`${this.urlBase}/getperiodo/${id}`);
  }

  getperiodo(id: number, id_periodo: number): Observable<Periodo> {
    return this.http.get<Periodo>(
      `${this.urlBase}/getperiodo/${id}/${id_periodo}`
    );
  }

  getsistemasoperativo(tipo: string): Observable<SistemaOperativo[]> {
    return this.http.get<SistemaOperativo[]>(`${this.urlBase}/getos/${tipo}`);
  }

  // lista de paises

  getpaises () : Observable<Paises[]>{
    return this.http.get<Paises[]>('https://restcountries.com/v3.1/all');
  }

  calculototalcarro() {
    let carrito: Carrito[] = JSON.parse(localStorage.getItem('carrito')!);
    let productos: ProductoCarro[] = [];
    let productoscarro: TotalCarro;

    let precio = 0;
    let precioold = 0;
    let ahorroa = 0;

    let neto: number = 0;
    let iva: number = 0;
    let total: number = 0;
    let ahorro: number = 0;

    carrito.forEach((element, i) => {
      element.periodos.forEach((element2) => {
        if (element.periodo == element2.id_periodo) {
          precio = element2.precio_descuento;
          precioold = element2.precio;
          ahorroa = element2.ahorro;

          productos.push({
            nombre: element.producto.nombre,
            precio: precio,
            precioold: precioold,
            ahorro: ahorroa,
          });
        }
      });
    });

    productos.forEach((element) => {
      neto += element.precio;
      ahorro += element.ahorro;
    });

    iva = Math.round(neto * 0.19);
    total = neto + iva;

    productoscarro = {
      productos: productos,
      neto: neto,
      iva: iva,
      total: total,
      ahorro: ahorro,
    };

    return productoscarro;
  }
}
