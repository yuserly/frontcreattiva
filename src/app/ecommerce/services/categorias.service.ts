import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Categorias, Productos, Subcategorias, Periodo } from '../interfaces/ecommerce.interface';

@Injectable({
  providedIn:'root'
})
export class CategoriasService{

  private urlBase: string = environment.urlBase;

  constructor(private http:HttpClient){}

  getCategorias():Observable<Categorias[]>{
    return this.http.get<Categorias[]>(`${this.urlBase}/getcategorias`);
  }

  getsubcategoria(id:number):Observable<Subcategorias[]>{

    return this.http.get<Subcategorias[]>(`${this.urlBase}/getsubcategorias/${id}`);
  }

  getproductos(id:number):Observable<Productos[]>{

    return this.http.get<Productos[]>(`${this.urlBase}/getproductos/${id}`);
  }

  getperiodos(id:number):Observable<Periodo[]>{
    return this.http.get<Periodo[]>(`${this.urlBase}/getperiodo/${id}`);
  }

  getperiodo(id:number,id_periodo:number):Observable<Periodo>{
    return this.http.get<Periodo>(`${this.urlBase}/getperiodo/${id}/${id_periodo}`);
  }

}
