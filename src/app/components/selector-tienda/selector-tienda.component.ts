import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-selector-tienda',
  templateUrl: './selector-tienda.component.html',
  styleUrls: ['./selector-tienda.component.scss'],
  standalone: false
})
export class SelectorTiendaComponent {

  constructor(private modalCtrl: ModalController) {}

  @Input() tiendas: string[] = [];

  busqueda: string = '';

  get tiendasFiltradas(): string[] {
    const filtro = this.busqueda.toLowerCase();
    return this.tiendas.filter(t => t.toLowerCase().includes(filtro));
  }

  seleccionarTienda(tienda: string | null) {
    this.modalCtrl.dismiss(tienda); // Devuelve el dato al padre y cierra el modal
  }
}


