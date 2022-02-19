import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { Main2Component } from './pages/main2/main2.component';
import { CarroComponent } from './pages/carro/carro.component';
import { LoginComponent } from './pages/login/login.component';
import { FacturacionComponent } from './pages/facturacion/facturacion.component';
import { FormularioPagoComponent } from './pages/formulario-pago/formulario-pago.component';
import { PagoExitosoComponent } from './pages/pago-exitoso/pago-exitoso.component';
import { PagoRechazadoComponent } from './pages/pago-rechazado/pago-rechazado.component';
import { PagoTransferenciaComponent } from './pages/pago-transferencia/pago-transferencia.component';


const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'',
        component: HomeComponent
      },
      {
        path:'configuracion',
        component: Main2Component
      },
      {
        path:'carrito',
        component:CarroComponent
      },
      {
        path:'login-rapido',
        component:LoginComponent
      },
      {
        path:'facturacion',
        component:FacturacionComponent
      },
      {
        path:'formulario-pago',
        component:FormularioPagoComponent
      },
      {
        path:'pago-exitoso',
        component:PagoExitosoComponent
      },
      {
        path:'pago-rechazado',
        component:PagoRechazadoComponent
      },
      {
        path:'pago-transferencia',
        component:PagoTransferenciaComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EcommerceRoutingModule { }
