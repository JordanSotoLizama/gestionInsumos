import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, LoadingController } from '@ionic/angular';
import { EvidenciasService } from 'src/app/services/evidencias.service';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { InsumosService } from 'src/app/services/insumos.service';

@Component({
  selector: 'app-detalle-distribucion',
  templateUrl: './detalle-distribucion.page.html',
  styleUrls: ['./detalle-distribucion.page.scss'],
  standalone: false
})
export class DetalleDistribucionPage implements OnInit {

  tienda: string = '';
  semana: number = 0;
  anio: number = 0;
  paqueteId: string = '';
  insumos: { id: string, nombre: string, cantidad: number }[] = [];

  nota: string = '';
  foto: string | null = null;
  fotoFile: Blob | null = null;

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    private storage: Storage,
    private evidenciaService: EvidenciasService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private insumosService: InsumosService
  ) {}

  ngOnInit() {
    this.tienda = this.route.snapshot.paramMap.get('tienda') || '';
    this.semana = Number(this.route.snapshot.paramMap.get('semana'));
    this.anio = Number(this.route.snapshot.paramMap.get('anio'));
    this.paqueteId = this.route.snapshot.paramMap.get('id') || '';
    

    this.cargarInsumosDelPaquete();
  }

  async cargarInsumosDelPaquete() {
    const q = query(
      collection(this.firestore, 'paquetes-pickeados'),
      where('tienda', '==', this.tienda),
      where('semana', '==', this.semana),
      where('anio', '==', this.anio)
    );
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const data = snapshot.docs[0].data();
      this.insumos = data['insumos'] || [];
    }
  }

  async agregarFoto() {
    const image = await Camera.getPhoto({
      quality: 70,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    this.foto = image.dataUrl!;
    const response = await fetch(this.foto);
    this.fotoFile = await response.blob();
  }

  async guardarDistribucion() {
    const loading = await this.loadingCtrl.create({ message: 'Guardando...' });
    await loading.present();

    let fotoUrl = '';
    if (this.fotoFile) {
      const filePath = `evidencias/${this.tienda}_${this.semana}_${this.anio}_${Date.now()}.jpg`;
      const storageRef = ref(this.storage, filePath);
      await uploadBytes(storageRef, this.fotoFile);
      fotoUrl = await getDownloadURL(storageRef);
    }

    const evidencia = {
      tienda: this.tienda,
      semana: this.semana,
      anio: this.anio,
      insumos: this.insumos,
      nota: this.nota,
      fotoUrl,
      fechaRegistro: new Date()
    };

    // Guardar en colección evidencias
    await this.evidenciaService.agregarEvidencia(evidencia);

    for (const item of this.insumos) {
      await this.evidenciaService.guardarMovimientoSalida(item.nombre, item.cantidad);
      await this.insumosService.actualizarStockSalida(item.id, item.cantidad);
    }

    // Eliminar paquete pickeado
    await this.evidenciaService.eliminarPaquetePickeado(this.paqueteId);

    await loading.dismiss();

    const alert = await this.alertCtrl.create({
      header: 'Éxito',
      message: 'La evidencia fue guardada correctamente y el paquete ha sido marcado como entregado.',
      buttons: ['OK']
    });
    await alert.present();

    setTimeout(() => {
      this.router.navigate(['/insumos-distribuir'], { replaceUrl: true });
    }, 2100);
  }
}
