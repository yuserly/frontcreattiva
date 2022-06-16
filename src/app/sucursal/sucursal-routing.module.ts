import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';
import { ServicioPendientePagoComponent } from './pages/servicio-pendiente-pago/servicio-pendiente-pago.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'',
        component: ServicioPendientePagoComponent
      },
      {
        path:'facturas/pendientes',
        component: ServicioPendientePagoComponent
      },
      {
        path:'servicios/:slug',
        component: ServiciosComponent
      },
      {
        path:'configuracion',
        component: ConfiguracionComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SucursalRoutingModule { }
