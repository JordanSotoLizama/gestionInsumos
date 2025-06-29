import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleDistribucionPageRoutingModule } from './detalle-distribucion-routing.module';

import { DetalleDistribucionPage } from './detalle-distribucion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleDistribucionPageRoutingModule
  ],
  declarations: [DetalleDistribucionPage]
})
export class DetalleDistribucionPageModule {}
