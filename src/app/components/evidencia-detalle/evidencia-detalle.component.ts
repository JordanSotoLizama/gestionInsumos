import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-evidencia-detalle',
  templateUrl: './evidencia-detalle.component.html',
  styleUrls: ['./evidencia-detalle.component.scss'],
  standalone: false
})
export class EvidenciaDetalleComponent {
  @Input() evidencia: any;

  constructor(private modalCtrl: ModalController) {}

  cerrar() {
    this.modalCtrl.dismiss();
  }

  async compartirEvidencia() {
    const mensaje = `
  *Evidencia de Entrega*

  Tienda: ${this.evidencia.tienda}
  Semana ${this.evidencia.semana} - Año ${this.evidencia.anio}

  Insumos entregados:
  ${this.evidencia.insumos?.map((i: string) => '• ' + i).join('\n') || 'Sin detalle'}

  Nota:
  ${this.evidencia.nota || 'Sin nota registrada'}
    `.trim();

    // Si navegador soporta compartir
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Evidencia de Entrega',
          text: mensaje,
          // files: [imagenBlob] // ← esto lo agregaremos cuando tengamos imagen como blob
        });
        console.log('Evidencia compartida con éxito');
      } catch (err) {
        console.error('Error al compartir', err);
      }
    } else {
      // Fallback para dispositivos que no soportan navigator.share
      const textoCodificado = encodeURIComponent(mensaje);
      const enlaceWhatsApp = `https://wa.me/?text=${textoCodificado}`;
      window.open(enlaceWhatsApp, '_blank');
    }
  }
}