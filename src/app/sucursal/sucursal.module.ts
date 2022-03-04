import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SucursalRoutingModule } from './sucursal-routing.module';
import { MainComponent } from './pages/main/main.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { ServicioPendientePagoComponent } from './pages/servicio-pendiente-pago/servicio-pendiente-pago.component';
import { EcommerceModule } from '../ecommerce/ecommerce.module';


@NgModule({
  declarations: [
    MainComponent,
    ServiciosComponent,
    ServicioPendientePagoComponent
  ],
  imports: [
    CommonModule,
    SucursalRoutingModule,
    EcommerceModule
  ]
})
export class SucursalModule { }
