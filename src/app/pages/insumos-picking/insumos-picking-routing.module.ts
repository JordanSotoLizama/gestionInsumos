import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsumosPickingPage } from './insumos-picking.page';

const routes: Routes = [
  {
    path: '',
    component: InsumosPickingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsumosPickingPageRoutingModule {}
