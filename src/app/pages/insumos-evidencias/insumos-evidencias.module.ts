import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InsumosEvidenciasPageRoutingModule } from './insumos-evidencias-routing.module';
import { InsumosEvidenciasPage } from './insumos-evidencias.page';
import { EvidenciaDetalleComponent } from 'src/app/components/evidencia-detalle/evidencia-detalle.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InsumosEvidenciasPageRoutingModule
  ],
  declarations: [
    InsumosEvidenciasPage,
    EvidenciaDetalleComponent
  ],
})
export class InsumosEvidenciasPageModule {}
