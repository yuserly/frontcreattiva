import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CategoriasService } from '../ecommerce/services/categorias.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {

  constructor(private CategoriasService:CategoriasService, private router: Router){}

  canActivate(): Observable<boolean> | boolean {

    return this.CategoriasService.validartoken().pipe(
      tap(valid => {

        if(!valid){
          localStorage.removeItem('token')
          localStorage.removeItem('empresaselect')
          this.router.navigate(['/login-sucursal']);
        }
      })
    );
  }
  canLoad(): Observable<boolean> | boolean  {

    return this.CategoriasService.validartoken().pipe(
      tap(valid => {

        if(!valid){
          localStorage.removeItem('token')
          localStorage.removeItem('empresaselect')
          this.router.navigate(['/login-sucursal']);
        }
      })
    );
  }
}
