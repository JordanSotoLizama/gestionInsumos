import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-insumos-historial',
  templateUrl: './insumos-historial.page.html',
  styleUrls: ['./insumos-historial.page.scss'],
  standalone: false,
})
export class InsumosHistorialPage implements OnInit {

  movimientos = [
    { fecha: new Date(2025, 5, 2), insumo: 'Guantes', tipo: 'Ingreso', cantidad: 20 },
    { fecha: new Date(2025, 5, 1), insumo: 'Cinta de embalaje', tipo: 'Salida', cantidad: 15 },
    { fecha: new Date(2025, 4, 28), insumo: 'Guantes', tipo: 'Ingreso', cantidad: 20 },
    { fecha: new Date(2025, 4, 25), insumo: 'Cinta de embalaje', tipo: 'Salida', cantidad: 15 }
  ];

  mostrarFecha: boolean = false;

  movimientosFiltrados = [...this.movimientos];
  filtroInsumo: string = '';
  filtroFecha: string | null = null;
  fechaDesde: string | null = null;
  fechaHasta: string | null = null;

  filtrarMovimientos() {
    const nombre = this.filtroInsumo?.toLowerCase() || '';
    const desde = this.fechaDesde ? new Date(this.fechaDesde) : null;
    const hasta = this.fechaHasta ? new Date(this.fechaHasta) : null;

    this.movimientosFiltrados = this.movimientos.filter(mov => {
      const coincideNombre = mov.insumo.toLowerCase().includes(nombre);
      const fechaMov = new Date(mov.fecha);

      let dentroDelRango = true;

      if (desde) {
        const d = new Date(desde);
        dentroDelRango =
          fechaMov.getFullYear() > d.getFullYear() ||
          (fechaMov.getFullYear() === d.getFullYear() && fechaMov.getMonth() > d.getMonth()) ||
          (fechaMov.getFullYear() === d.getFullYear() && fechaMov.getMonth() === d.getMonth() && fechaMov.getDate() >= d.getDate());
      }

      if (hasta && dentroDelRango) {
        const h = new Date(hasta);
        dentroDelRango =
          fechaMov.getFullYear() < h.getFullYear() ||
          (fechaMov.getFullYear() === h.getFullYear() && fechaMov.getMonth() < h.getMonth()) ||
          (fechaMov.getFullYear() === h.getFullYear() && fechaMov.getMonth() === h.getMonth() && fechaMov.getDate() <= h.getDate());
      }

      return coincideNombre && dentroDelRango;
    });
  }

  limpiarRangoFechas() {
    this.fechaDesde = null;
    this.fechaHasta = null;
    this.filtrarMovimientos();
  }

  constructor(private modalCtrl: ModalController) {

   }

  ngOnInit() {
  }

}
