import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subcategorias } from 'src/app/ecommerce/interfaces/ecommerce.interface';
import { environment } from 'src/environments/environment';
import { Servicios, Venta } from '../../ecommerce/interfaces/sucursal.interfaces';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {
  private urlBase: string = environment.urlBase;

  constructor(private http: HttpClient) { }


  getServiciosPendientePago(id:string): Observable<Servicios[]> {
    return this.http.get<Servicios[]>(`${this.urlBase}/getserviciospendpago/${id}`);
  }

  getServicios(id:string, subcategoria: string): Observable<Servicios[]> {
    return this.http.get<Servicios[]>(`${this.urlBase}/getservicios/${id}/${subcategoria}`);
  }
  getsubcategoriaslug(slug:string): Observable<Subcategorias>{

    return this.http.get<Subcategorias>(`${this.urlBase}/getsubcategoriaslug/${slug}`);

  }

  getcodepassword(code:string): Observable<any>{
    return this.http.get<any>(`${this.urlBase}/getcodepassword/${code}`);
  }

  cambiopassword(data:any):Observable<any>{

    return this.http.post(`${this.urlBase}/cambiopassword`, data)

  }

  facturapendientepago(id:string): Observable<Venta[]>{
    return this.http.get<Venta[]>(`${this.urlBase}/getfacturaspendpago/${id}`);
  }

  pagarfactura(data:any):Observable<any>{

    return this.http.post(`${this.urlBase}/pagarventa`, data)

  }

}
