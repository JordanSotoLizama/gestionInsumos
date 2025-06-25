import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InsumosDistribuirPageRoutingModule } from './insumos-distribuir-routing.module';

import { InsumosDistribuirPage } from './insumos-distribuir.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InsumosDistribuirPageRoutingModule
  ],
  declarations: [InsumosDistribuirPage]
})
export class InsumosDistribuirPageModule {}
