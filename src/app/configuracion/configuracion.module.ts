import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ConfiguracionRoutingModule } from './configuracion-routing.module';
import { Main2Component } from './pages/main2/main2.component';
import { HostingComponent } from './pages/hosting/hosting.component';
import { VpsComponent } from './pages/vps/vps.component';
import { DominioComponent } from './pages/dominio/dominio.component';
import { PeriodoComponent } from './pages/periodo/periodo.component';
import { DetallePedidoComponent } from './pages/detalle-pedido/detalle-pedido.component';
import { SistemaOperativoComponent } from './pages/sistema-operativo/sistema-operativo.component';
import { ModalDominioComponent } from './pages/modal-dominio/modal-dominio.component';


@NgModule({
  declarations: [
    Main2Component,
    HostingComponent,
    VpsComponent,
    DominioComponent,
    PeriodoComponent,
    DetallePedidoComponent,
    SistemaOperativoComponent,
    ModalDominioComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ConfiguracionRoutingModule
  ]
})
export class ConfiguracionModule { }
