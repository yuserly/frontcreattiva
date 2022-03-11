import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';

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
import { Regiones, Comunas } from '../interfaces/ecommerce.interface';

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

  // regiones

  getRegiones(): Observable<Regiones[]> {
    return this.http.get<Regiones[]>(`${this.urlBase}/getregiones`);
  }

  // comunas

  getComunas(id:number): Observable<Comunas[]> {
    return this.http.get<Comunas[]>(`${this.urlBase}/getcomunas/${id}`);
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

  // login

  login(data:any):Observable<any>{

    return this.http.post(`${this.urlBase}/login`, data)

  }

  // empresa

  crearempresa(data:any):Observable<any>{

    return this.http.post(`${this.urlBase}/crearempresa`, data)

  }

  validarrut(data:any):Observable<any>{

    return this.http.post(`${this.urlBase}/validarrut`, data)

  }

  // solicitud codigo accesso

  solicitudcode(data:any):Observable<any>{

    return this.http.post(`${this.urlBase}/solicitudcodigo`, data)

  }

  // login por codigo

  logincode(data:any):Observable<any>{

    return this.http.post(`${this.urlBase}/logincode`, data)

  }

  getempresa(email:string):Observable<any>{

    return this.http.get<any>(`${this.urlBase}/empresa/${email}`);
  }

  getempresascliente(email:string):Observable<any>{

    return this.http.get<any>(`${this.urlBase}/empresascliente/${email}`);
  }

  getempresaxid(id:number):Observable<any>{

    return this.http.get<any>(`${this.urlBase}/empresa/xid/${id}`);
  }

  // validar token

  validartoken(){

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(`${this.urlBase}/validartoken`, {headers}).pipe(
      map(resp =>{
        return resp.data.ok;
      }),
      catchError(err => of(false))
    )
  }

  //validar cupon
  validarcupon(cupon:string,subcategoria_id:number):Observable<any>{

    return this.http.get<any>(`${this.urlBase}/validarcupon/${cupon}/${subcategoria_id}`);

  }

  calculototalcarro() {
    let carrito: Carrito[] = JSON.parse(localStorage.getItem('carrito')!);
    let productos: ProductoCarro[] = [];
    let productoscarro: TotalCarro;

    let precio = 0;
    let precioold = 0;
    let ahorroa = 0;

    let tlicencias:number = 10;

    let neto: number = 0;
    let iva: number = 0;
    let total: number = 0;
    let ahorro: number = 0;

    let montocupon:number = 0;

      //totalLicencias = element.cantidadlicencias;
      //console.log("Total licencias: "+element.cantidadlicencias);

    console.log("datos del carrito, detalles:");
    console.log(carrito);

    carrito.forEach((element, i) => {

        element.periodos.forEach((element2) => {

          if (element.periodo == element2.id_periodo) {

            //Licencias Google Workspace y Microsoft 365
            if(element.producto.subcategoria_id==20 ||
              element.producto.subcategoria_id==24){

              precio = element2.precio_descuento*<number>element.cantidad;
              precioold = element2.precio*<number>element.cantidad;
              ahorroa = element2.ahorro*<number>element.cantidad;

            }else{

              precio = element2.precio_descuento;
              precioold = element2.precio;
              ahorroa = element2.ahorro;

            }


            productos.push({
              nombre: element.producto.nombre,
              precio: precio,
              precioold: precioold,
              ahorro: ahorroa,
            });

            //asignar cupon a detalles
            montocupon = <number>element.cupon_descuento;

            if(montocupon>0){
              productos.push({
                nombre: 'Cupón de descuento para '+element.producto.nombre,
                precio: montocupon*-1,
                precioold: 0,
                ahorro: 0,
              });
            }



          }
        });



    });

    console.log()
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

  generarordencompra(data:any){
    return this.http.post<any>(`${this.urlBase}/generarorder`, data)

  }

  recuperarpassword(email:string){
    return this.http.get<any>(`${this.urlBase}/solicitudcambiopass/${email}`);
  }
}
