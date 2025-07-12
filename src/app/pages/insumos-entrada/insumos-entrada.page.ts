import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-insumos-entrada',
  templateUrl: './insumos-entrada.page.html',
  styleUrls: ['./insumos-entrada.page.scss'],
  standalone: false,
})
export class InsumosEntradaPage implements OnInit {

  insumoSeleccionado: string = '';
  cantidad: number | null = null;
  fechaActual: string = '';

  constructor(private toastCtrl: ToastController){

  }

  ngOnInit() {
    const hoy = new Date();

    const dia = hoy.getDate().toString().padStart(2, '0');
    const mes = (hoy.getMonth() + 1).toString().padStart(2, '0');
    const anio = hoy.getFullYear();

  this.fechaActual = `${dia}/${mes}/${anio}`;
  }

  async guardarInsumo() {
    const toast = await this.toastCtrl.create({
      message: '✅ Insumo ingresado con éxito',
      duration: 2000,
      color: 'success',
      position: 'bottom',
    });
    toast.present();
    this.insumoSeleccionado = '';
    this.cantidad = null;
  }

}
