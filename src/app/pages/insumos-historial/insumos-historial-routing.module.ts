import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsumosHistorialPage } from './insumos-historial.page';

const routes: Routes = [
  {
    path: '',
    component: InsumosHistorialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsumosHistorialPageRoutingModule {}
