import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SelectorTiendaComponent } from 'src/app/components/selector-tienda/selector-tienda.component';

@Component({
  selector: 'app-insumos-picking',
  templateUrl: './insumos-picking.page.html',
  styleUrls: ['./insumos-picking.page.scss'],
  standalone: false
})
export class InsumosPickingPage implements OnInit {

  tiendaSeleccionada: string = '';

  tiendas: string[] = [
    'Puente Alto', 'Vespucio', 'Quilicura', 'Plaza Sur',
    'Plaza Norte', 'Plaza Alameda', 'Paseo Huérfanos',
    'Irarrázabal', 'La Fábrica'
  ];

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  async abrirSelectorTienda() {
    const modal = await this.modalCtrl.create({
      component: SelectorTiendaComponent,
      componentProps: {
        tiendas: this.tiendas
      },
      cssClass: 'modal-tienda'
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.tiendaSeleccionada = result.data ?? '';
      }
    });

    await modal.present();
  }
}
