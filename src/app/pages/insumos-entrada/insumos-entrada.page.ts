import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { InsumosService } from 'src/app/services/insumos.service';
import { Insumo } from 'src/app/services/insumos.service';
import { Firestore, collection, addDoc, Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-insumos-entrada',
  templateUrl: './insumos-entrada.page.html',
  styleUrls: ['./insumos-entrada.page.scss'],
  standalone: false
})
export class InsumosEntradaPage implements OnInit {

  insumos: Insumo[] = [];
  insumoSeleccionado: Insumo | null = null;
  cantidad: number | null = null;
  fechaActual: string = new Date().toLocaleDateString('es-CL');

  constructor(
    private insumosService: InsumosService,
    private alertCtrl: AlertController,
    private firestore: Firestore
  ) {}

  ngOnInit() {
    this.insumosService.getInsumos().subscribe(data => {
      this.insumos = data;
    });
  }

  async guardarInsumo() {
    if (!this.insumoSeleccionado || !this.cantidad || this.cantidad <= 0) return;

    try {
      // 1. Actualizar stock
      await this.insumosService.actualizarStock(this.insumoSeleccionado.id, this.cantidad);

      // 2. Registrar entrada en "movimientos"
      const ref = collection(this.firestore, 'movimientos');
      await addDoc(ref, {
        tipo: 'entrada',
        insumo: this.insumoSeleccionado,
        cantidad: this.cantidad,
        fecha: Timestamp.now()
      });

      const alert = await this.alertCtrl.create({
        header: 'Éxito',
        message: 'El insumo fue ingresado correctamente.',
        buttons: ['OK']
      });
      await alert.present();

      this.insumoSeleccionado.nombre = '';
      this.cantidad = null;

    } catch (error) {
      console.error('Error al guardar:', error);
    }
  }
}
