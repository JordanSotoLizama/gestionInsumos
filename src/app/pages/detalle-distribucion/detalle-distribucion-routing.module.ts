import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleDistribucionPage } from './detalle-distribucion.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleDistribucionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleDistribucionPageRoutingModule {}
