import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EcommerceRoutingModule } from './ecommerce-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { CaracteristicasComponent } from './pages/caracteristicas/caracteristicas.component';
import { PlanesComponent } from './pages/planes/planes.component';
import { Main2Component } from './pages/main2/main2.component';
import { HostingComponent } from './pages/hosting/hosting.component';
import { VpsComponent } from './pages/vps/vps.component';
import { DominioComponent } from './pages/dominio/dominio.component';
import { PeriodoComponent } from './pages/periodo/periodo.component';
import { DetallePedidoComponent } from './pages/detalle-pedido/detalle-pedido.component';
import { ModalDominioComponent } from './pages/modal-dominio/modal-dominio.component';
import { CarroComponent } from './pages/carro/carro.component';
import { NavComponent } from './pages/nav/nav.component';
import { FooterComponent } from './pages/footer/footer.component';

import { SharedModule } from '../shared/shared.module';
import { FacturacionComponent } from './pages/facturacion/facturacion.component';


@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    MainComponent,
    CaracteristicasComponent,
    PlanesComponent,
    Main2Component,
    HostingComponent,
    VpsComponent,
    DominioComponent,
    PeriodoComponent,
    DetallePedidoComponent,
    ModalDominioComponent,
    CarroComponent,
    NavComponent,
    FooterComponent,
    FacturacionComponent
  ],
  imports: [
    CommonModule,
    EcommerceRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports:[
    CaracteristicasComponent,
    PlanesComponent,
  ]
})
export class EcommerceModule { }
