import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsumosDistribuirPage } from './insumos-distribuir.page';

const routes: Routes = [
  {
    path: '',
    component: InsumosDistribuirPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsumosDistribuirPageRoutingModule {}
