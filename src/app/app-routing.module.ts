import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './ecommerce/pages/login/login.component';
import { ValidarTokenGuard } from './guards/validar-token.guard';

const routes: Routes = [

  {
    path:'',
    loadChildren: () => import('./ecommerce/ecommerce.module').then(m => m.EcommerceModule)
  },
  {
    path:'sucursal',
    loadChildren: () => import('./sucursal/sucursal.module').then(m => m.SucursalModule),
    canActivate:[ValidarTokenGuard],
    canLoad:[ValidarTokenGuard]
  },
  {
    path:'login-rapido',
    component: LoginComponent
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
