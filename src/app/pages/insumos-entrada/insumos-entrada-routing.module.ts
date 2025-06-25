import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsumosEntradaPage } from './insumos-entrada.page';

const routes: Routes = [
  {
    path: '',
    component: InsumosEntradaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsumosEntradaPageRoutingModule {}
