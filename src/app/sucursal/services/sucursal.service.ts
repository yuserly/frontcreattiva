import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subcategorias } from 'src/app/ecommerce/interfaces/ecommerce.interface';
import { environment } from 'src/environments/environment';
import { Servicios } from '../../ecommerce/interfaces/sucursal.interfaces';

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

}
