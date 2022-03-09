import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { SucursalRoutingModule } from './sucursal-routing.module';
import { MainComponent } from './pages/main/main.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { ServicioPendientePagoComponent } from './pages/servicio-pendiente-pago/servicio-pendiente-pago.component';
import { EcommerceModule } from '../ecommerce/ecommerce.module';
import { LoginSucursalComponent } from './pages/login-sucursal/login-sucursal.component';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';


@NgModule({
  declarations: [
    MainComponent,
    ServiciosComponent,
    ServicioPendientePagoComponent,
    LoginSucursalComponent,
    ConfiguracionComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SucursalRoutingModule,
    EcommerceModule
  ]
})
export class SucursalModule { }
