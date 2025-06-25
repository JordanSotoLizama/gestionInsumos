import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InsumosEntradaPageRoutingModule } from './insumos-entrada-routing.module';

import { InsumosEntradaPage } from './insumos-entrada.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InsumosEntradaPageRoutingModule
  ],
  declarations: [InsumosEntradaPage]
})
export class InsumosEntradaPageModule {}
