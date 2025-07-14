import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-evidencia-detalle',
  templateUrl: './evidencia-detalle.component.html',
  styleUrls: ['./evidencia-detalle.component.scss'],
  standalone: false
})
export class EvidenciaDetalleComponent {
  @Input() evidencia: any;

  insumos: { nombre: string; cantidad: number }[] = [];

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    if (this.evidencia?.insumos) {
      this.insumos = this.evidencia.insumos;
    }
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }

  async compartirEvidencia() {
    const mensaje = `
  *Evidencia de Entrega*

  📦 Tienda: ${this.evidencia.tienda}
  📆 Semana: ${this.evidencia.semana} • Año: ${this.evidencia.anio}

  📋 Insumos entregados:
  ${this.evidencia.insumos?.map((i: any) => `• ${i.nombre} (x${i.cantidad})`).join('\n') || 'Sin detalle'}

  📝 Nota:
  ${this.evidencia.nota || 'Sin nota registrada'}
  `.trim();

    try {
      const response = await fetch(this.evidencia.fotoUrl);
      const blob = await response.blob();

      const file = new File([blob], `evidencia_${this.evidencia.tienda}.jpg`, {
        type: blob.type
      });

      // Verifica si se puede compartir con archivo
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'Evidencia de Entrega',
          text: mensaje,
          files: [file]
        });
        console.log('Compartido con imagen como archivo');
      } else {
        // Advertencia + fallback
        alert('⚠️ Tu dispositivo no soporta compartir archivos adjuntos. Se enviará un mensaje con el enlace a la imagen.');

        const textoCodificado = encodeURIComponent(`${mensaje}\n\n🔗 Imagen: ${this.evidencia.fotoUrl}`);
        window.open(`https://wa.me/?text=${textoCodificado}`, '_blank');
      }
    } catch (err) {
      console.error('Error al compartir evidencia:', err);

      alert('⚠️ Ocurrió un error al adjuntar la imagen. Se enviará solo el texto con enlace.');

      const textoCodificado = encodeURIComponent(`${mensaje}\n\n🔗 Imagen: ${this.evidencia.fotoUrl}`);
      window.open(`https://wa.me/?text=${textoCodificado}`, '_blank');
    }
  }
}