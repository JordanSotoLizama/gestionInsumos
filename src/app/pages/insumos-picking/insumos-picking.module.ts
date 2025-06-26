import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InsumosPickingPageRoutingModule } from './insumos-picking-routing.module';

import { InsumosPickingPage } from './insumos-picking.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InsumosPickingPageRoutingModule,
    SharedModule
  ],
  declarations: [
    InsumosPickingPage,
  ]
})
export class InsumosPickingPageModule {}
