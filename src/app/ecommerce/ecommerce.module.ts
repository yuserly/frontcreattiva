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
import { FormularioPagoComponent } from './pages/formulario-pago/formulario-pago.component';
import { PagoExitosoComponent } from './pages/pago-exitoso/pago-exitoso.component';
import { PagoRechazadoComponent } from './pages/pago-rechazado/pago-rechazado.component';
import { PagoTransferenciaComponent } from './pages/pago-transferencia/pago-transferencia.component';
import { CantidadlicenciasComponent } from './pages/cantidadlicencias/cantidadlicencias.component';
import { LoginPasswordComponent } from './pages/login-password/login-password.component';
import { SeleccionarEmpresaComponent } from './pages/seleccionar-empresa/seleccionar-empresa.component';
import { CodigoRapidoComponent } from './pages/codigo-rapido/codigo-rapido.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { CompraDominiosComponent } from './pages/compra-dominios/compra-dominios.component';
import { DireccionIpComponent } from './pages/direccion-ip/direccion-ip.component';
import { ResultadosBusquedaComponent } from './pages/resultados-busqueda/resultados-busqueda.component';
import { BuscadorComponent } from './pages/buscador/buscador.component';
import { FormularioContactoComponent } from './pages/formulario-contacto/formulario-contacto.component';
import { ConfiguracionProductoComponent } from './pages/configuracion-producto/configuracion-producto.component';
import { SoporteComponent } from './pages/soporte/soporte.component';
//import { PaginationPipe } from './pipes/paginacion.pipe';
//import { PaginadorComponent } from './pages/paginador/paginador.component';
import { PreguntasFrecuentesComponent } from './pages/preguntas-frecuentes/preguntas-frecuentes.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {NgxPaginationModule} from 'ngx-pagination';
import { CarouselComponent } from './pages/carousel/carousel.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { PoliticasCalidadComponent } from './pages/politicas-calidad/politicas-calidad.component';
import { TerminosCondicionesComponent } from './pages/terminos-condiciones/terminos-condiciones.component';

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
    FacturacionComponent,
    FormularioPagoComponent,
    PagoExitosoComponent,
    PagoRechazadoComponent,
    PagoTransferenciaComponent,
    CantidadlicenciasComponent,
    LoginPasswordComponent,
    SeleccionarEmpresaComponent,
    CodigoRapidoComponent,
    CompraDominiosComponent,
    DireccionIpComponent,
    ResultadosBusquedaComponent,
    BuscadorComponent,
    FormularioContactoComponent,
    ConfiguracionProductoComponent,
    SoporteComponent,
    //PaginationPipe,
    //PaginadorComponent,
    PreguntasFrecuentesComponent,
    CarouselComponent,
    PoliticasCalidadComponent,
    TerminosCondicionesComponent
  ],
  imports: [
    CommonModule,
    EcommerceRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    GooglePlaceModule,
    CarouselModule,
    NgxPaginationModule,
    TranslateModule
  ],
  exports:[
    CaracteristicasComponent,
    PlanesComponent,
    HostingComponent,
    NavComponent,
    FooterComponent
  ]
})
export class EcommerceModule { }
