import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-detalle-distribucion',
  templateUrl: './detalle-distribucion.page.html',
  styleUrls: ['./detalle-distribucion.page.scss'],
  standalone: false,
})
export class DetalleDistribucionPage implements OnInit {

  tienda: string = '';
  semana: string = '';
  anio: string = '';
  nota: string = '';
  foto: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private toastCtrl: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    this.tienda = decodeURIComponent(this.route.snapshot.paramMap.get('tienda') || '');
    this.semana = this.route.snapshot.paramMap.get('semana') || '';
    this.anio = this.route.snapshot.paramMap.get('anio') || '';
  }

  async agregarFoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 70,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });

      if (image.dataUrl) {
        this.foto = image.dataUrl;
      } else {
        this.foto = null;
      }
    } catch (error) {
      console.log('Error al capturar foto:', error);
    }
  }

  async guardarDistribucion() {
    const toast = await this.toastCtrl.create({
      message: '✅ Distribución guardada correctamente.',
      duration: 2000,
      color: 'success',
      position: 'bottom'
    });

    await toast.present();

    // Redirigir después del toast
    setTimeout(() => {
      this.router.navigate(['/insumos-distribuir'], { replaceUrl: true });
    }, 2100);
  }

}
