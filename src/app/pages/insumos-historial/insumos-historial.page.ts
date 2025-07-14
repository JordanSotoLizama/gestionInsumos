import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';


@Component({
  selector: 'app-insumos-historial',
  templateUrl: './insumos-historial.page.html',
  styleUrls: ['./insumos-historial.page.scss'],
  standalone: false,
})
export class InsumosHistorialPage implements OnInit {

  movimientos: any[] = [];

  mostrarFecha: boolean = false;

  movimientosFiltrados: any[] = [];
  filtroInsumo: string = '';
  filtroFecha: string | null = null;
  fechaDesde: string | null = null;
  fechaHasta: string | null = null;

  filtrarMovimientos() {
    const nombre = this.filtroInsumo?.toLowerCase() || '';
    const desde = this.fechaDesde ? new Date(this.fechaDesde) : null;
    const hasta = this.fechaHasta ? new Date(this.fechaHasta) : null;

    this.movimientosFiltrados = this.movimientos.filter(mov => {
      // 1. Convertir el nombre correctamente (string o { nombre: string })
      const insumoTexto = typeof mov.insumo === 'string'
        ? mov.insumo
        : mov.insumo?.nombre || '';

      const coincideNombre = insumoTexto.toLowerCase().includes(nombre);

      // 2. Convertir fecha a Date
      const fechaMov = new Date(mov.fecha?.seconds ? mov.fecha.seconds * 1000 : mov.fecha);

      let dentroDelRango = true;

      if (desde) {
        dentroDelRango = fechaMov >= desde;
      }

      if (hasta && dentroDelRango) {
        dentroDelRango = fechaMov <= hasta;
      }

      return coincideNombre && dentroDelRango;
    });
  }

  limpiarRangoFechas() {
    this.fechaDesde = null;
    this.fechaHasta = null;
    this.filtrarMovimientos();
  }

  constructor(
    private modalCtrl: ModalController,
    private firestore: Firestore
  ) {

   }

  ngOnInit() {
    const ref = collection(this.firestore, 'movimientos');
    collectionData(ref, { idField: 'id' }).subscribe((data: any[]) => {
      this.movimientos = data.map(mov => ({
        ...mov,
        // Convierte el timestamp a Date si es necesario
        fecha: mov.fecha?.seconds ? new Date(mov.fecha.seconds * 1000) : mov.fecha
      })).sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

      this.filtrarMovimientos();
    });
  }

}
