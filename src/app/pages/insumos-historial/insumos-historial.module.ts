import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { InsumosHistorialPageRoutingModule } from './insumos-historial-routing.module';
import { InsumosHistorialPage } from './insumos-historial.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InsumosHistorialPageRoutingModule,
  ],
  declarations: [InsumosHistorialPage]
})
export class InsumosHistorialPageModule {}