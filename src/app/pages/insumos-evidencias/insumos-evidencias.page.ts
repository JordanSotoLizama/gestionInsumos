import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EvidenciaDetalleComponent } from 'src/app/components/evidencia-detalle/evidencia-detalle.component';
import { EvidenciasService } from 'src/app/services/evidencias.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insumos-evidencias',
  templateUrl: './insumos-evidencias.page.html',
  styleUrls: ['./insumos-evidencias.page.scss'],
  standalone: false,
})
export class InsumosEvidenciasPage implements OnInit {

  terminoBusqueda: string = '';

  evidencias: any[] = [];

  constructor(
    private modalCtrl: ModalController,
    private evidenciasService: EvidenciasService,
    private router: Router
  ) { }

  ngOnInit() {
    this.evidenciasService.getEvidencias().subscribe(data => {
      this.evidencias = data;
      console.log('Evidencias desde Firebase:', data);
    });
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
      componentProps: { evidencia },
    });
    await modal.present();
  }


}
