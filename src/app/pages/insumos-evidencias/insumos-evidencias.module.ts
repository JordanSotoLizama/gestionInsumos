import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InsumosEvidenciasPageRoutingModule } from './insumos-evidencias-routing.module';

import { InsumosEvidenciasPage } from './insumos-evidencias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InsumosEvidenciasPageRoutingModule
  ],
  declarations: [InsumosEvidenciasPage]
})
export class InsumosEvidenciasPageModule {}
