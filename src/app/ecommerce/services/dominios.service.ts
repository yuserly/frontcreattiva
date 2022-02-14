import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Dominios, PrecioDominios } from '../interfaces/dominios.interfaces';


@Injectable({
  providedIn:'root'
})
export class DominiosService{

  private urlBase: string = environment.urlBase;

  totalCarro: number = 0;

  constructor(private http:HttpClient){}

  getdominios(dominio:string, extension:string):Observable<Dominios>{

    return this.http.get<Dominios>(`${this.urlBase}/dominios/${dominio}/${extension}`);


  }

  getpreciodominio():Observable<PrecioDominios[]>{

    return this.http.get<PrecioDominios[]>(`${this.urlBase}/preciodominios`);
  }


}
