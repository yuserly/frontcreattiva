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
import { LoginPasswordComponent } from './pages/login-password/login-password.component';
import { SeleccionarEmpresaComponent } from './pages/seleccionar-empresa/seleccionar-empresa.component';
import { CodigoRapidoComponent } from './pages/codigo-rapido/codigo-rapido.component';
import { CompraDominiosComponent } from './pages/compra-dominios/compra-dominios.component';
import { ResultadosBusquedaComponent } from './pages/resultados-busqueda/resultados-busqueda.component';
import { FormularioContactoComponent } from './pages/formulario-contacto/formulario-contacto.component';
import { ConfiguracionProductoComponent } from './pages/configuracion-producto/configuracion-producto.component';
import { SoporteComponent } from './pages/soporte/soporte.component';
import { PreguntasFrecuentesComponent } from './pages/preguntas-frecuentes/preguntas-frecuentes.component';

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
        path:'resultados-busqueda',
        component:ResultadosBusquedaComponent
      },
      {
        path:'compra-dominios',
        component:CompraDominiosComponent
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
      },
      {
        path:'login',
        component:LoginPasswordComponent
      },
      {
        path:'seleccionar-empresa',
        component:SeleccionarEmpresaComponent
      },
      {
        path:'codigo-rapido',
        component:CodigoRapidoComponent
      },
      {
        path:'busqueda',
        component:CodigoRapidoComponent
      },
      {
        path:'contacto',
        component:FormularioContactoComponent
      },
      {
        path: 'soporte',
        component:SoporteComponent
      },
      {
        path: 'soporte/faq/:slug',
        component:PreguntasFrecuentesComponent
      },
      {
        path: 'soporte/:ip',
        component:SoporteComponent
      },
      {
        path:'configura-tu-producto/:slug',
        component:ConfiguracionProductoComponent
      },

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EcommerceRoutingModule { }
