import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EvidenciaDetalleComponent } from 'src/app/components/evidencia-detalle/evidencia-detalle.component';
@Component({
  selector: 'app-insumos-evidencias',
  templateUrl: './insumos-evidencias.page.html',
  styleUrls: ['./insumos-evidencias.page.scss'],
  standalone: false,
})
export class InsumosEvidenciasPage implements OnInit {

  terminoBusqueda: string = '';

  evidencias: any[] = [
    { tienda: 'Valdivia', anio: 2024, semana: 23 },
    { tienda: 'Valdivia', anio: 2024, semana: 22 },
    { tienda: 'Puente Alto', anio: 2025, semana: 21 },
    { tienda: 'Quilicura', anio: 2024, semana: 23 },
  ];

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  get evidenciasFiltradas(): any[] {
    const term = this.terminoBusqueda.toLowerCase();
    return this.evidencias.filter(e =>
      e.tienda.toLowerCase().includes(term) ||
      e.anio.toString().includes(term) ||
      e.semana.toString().includes(term)
    );
  }

  async abrirDetalle(evidencia: any) {
    const modal = await this.modalCtrl.create({
      component: EvidenciaDetalleComponent,
      componentProps: { evidencia }
    });
    await modal.present();
  }

}
