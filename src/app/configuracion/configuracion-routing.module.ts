import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Main2Component } from '../configuracion/pages/main2/main2.component';
import { HostingComponent } from '../configuracion/pages/hosting/hosting.component';
import { CarroComponent } from '../configuracion/pages/carro/carro.component';

const routes: Routes = [
  {
    path: '',
    component: Main2Component,
    children: [
      {
        path: '',
        component: HostingComponent,
      },
      {
        path: 'validar-cart',
        component: CarroComponent,
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfiguracionRoutingModule {}
