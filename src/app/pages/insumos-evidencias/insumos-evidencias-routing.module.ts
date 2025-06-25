import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsumosEvidenciasPage } from './insumos-evidencias.page';

const routes: Routes = [
  {
    path: '',
    component: InsumosEvidenciasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsumosEvidenciasPageRoutingModule {}
