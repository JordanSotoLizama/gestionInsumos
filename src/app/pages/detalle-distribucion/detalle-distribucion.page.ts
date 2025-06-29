import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

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

  agregarFoto() {
    console.log('Aquí se abriría la cámara...'); // luego lo conectaremos con cámara real
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
