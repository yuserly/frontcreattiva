import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path:'',
    loadChildren: () => import('./ecommerce/ecommerce.module').then(m => m.EcommerceModule)
  },
  {
    path:'sucursal',
    loadChildren: () => import('./sucursal/sucursal.module').then(m => m.SucursalModule)
  },
  {
    path:'configuraciones',
    loadChildren: () => import('./configuracion/configuracion.module').then(m => m.ConfiguracionModule)
  },
  {
    path:'**',
    redirectTo:''
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
