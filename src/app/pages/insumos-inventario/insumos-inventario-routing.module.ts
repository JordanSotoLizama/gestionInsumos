import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsumosInventarioPage } from './insumos-inventario.page';

const routes: Routes = [
  {
    path: '',
    component: InsumosInventarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsumosInventarioPageRoutingModule {}
