import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { SelectorTiendaComponent } from '../components/selector-tienda/selector-tienda.component';

@NgModule({
  declarations: [SelectorTiendaComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [SelectorTiendaComponent]
})
export class SharedModule {}
