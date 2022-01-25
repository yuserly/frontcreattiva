import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EcommerceRoutingModule } from './ecommerce-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { CaracteristicasComponent } from './pages/caracteristicas/caracteristicas.component';
import { PlanesComponent } from './pages/planes/planes.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    MainComponent,
    CaracteristicasComponent,
    PlanesComponent
  ],
  imports: [
    CommonModule,
    EcommerceRoutingModule,
    SharedModule
  ],
  exports:[
    CaracteristicasComponent,
    PlanesComponent
  ]
})
export class EcommerceModule { }
