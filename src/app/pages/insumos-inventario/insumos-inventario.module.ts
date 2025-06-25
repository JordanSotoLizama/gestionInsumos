import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InsumosInventarioPageRoutingModule } from './insumos-inventario-routing.module';

import { InsumosInventarioPage } from './insumos-inventario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InsumosInventarioPageRoutingModule
  ],
  declarations: [InsumosInventarioPage]
})
export class InsumosInventarioPageModule {}
