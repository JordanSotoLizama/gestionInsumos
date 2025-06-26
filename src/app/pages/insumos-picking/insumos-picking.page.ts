import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SelectorTiendaComponent } from 'src/app/components/selector-tienda/selector-tienda.component';
import { AlertController } from '@ionic/angular'; 

@Component({
  selector: 'app-insumos-picking',
  templateUrl: './insumos-picking.page.html',
  styleUrls: ['./insumos-picking.page.scss'],
  standalone: false
})
export class InsumosPickingPage implements OnInit {

  tiendaSeleccionada: string = '';

  anioActual: number = new Date().getFullYear();
  semanaActual: number | null = null;

  insumosDisponibles: string[] = [
  'Cinta de embalaje',
  'Cinta TTR',
  'Etiqueta Amarilla',
  'Etiqueta Blanca',
  'Rollos térmicos',
  'Toner 1060'
  ];

  insumoSeleccionado: string = '';

  insumos: { nombre: string; cantidad: number }[] = [];

  tiendas: string[] = [
    'Puente Alto', 'Vespucio', 'Quilicura', 'Plaza Sur',
    'Plaza Norte', 'Plaza Alameda', 'Paseo Huérfanos',
    'Irarrázabal', 'La Fábrica'
  ];

  get semanaInvalida(): boolean {
  return (
    this.semanaActual !== null &&
    (this.semanaActual < 1 || this.semanaActual > 52)
  );
 }

  constructor(private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  async abrirSelectorTienda() {
    const modal = await this.modalCtrl.create({
      component: SelectorTiendaComponent,
      componentProps: {
        tiendas: this.tiendas
      },
      cssClass: 'modal-tienda'
    });

    modal.onDidDismiss().then((result) => {
      this.tiendaSeleccionada = result.data ?? '';
    });

    await modal.present();
  }

  async seleccionarInsumo() {

    if (this.insumosFiltrados.length === 0) {
      const alerta = await this.alertCtrl.create({
        header: '¡Todos los insumos agregados!',
        message: 'Ya has agregado todos los insumos disponibles.',
        buttons: ['OK']
      });
      await alerta.present();
      return; // <- detenemos la ejecución
    }
    const alert = await this.alertCtrl.create({
      header: 'Selecciona un Insumo',
      inputs: this.insumosFiltrados.map(nombre => ({
        type: 'radio',
        label: nombre,
        value: nombre
        })),
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Continuar',
          handler: (data) => {
            this.insumoSeleccionado = data;
            this.ingresarCantidad();
          }
        }
      ]
    });

    await alert.present();
  }

  async ingresarCantidad() {
    const alert = await this.alertCtrl.create({
      header: 'Cantidad del insumo',
      message: `Insumo seleccionado: ${this.insumoSeleccionado}`,
      inputs: [
        {
          name: 'cantidad',
          type: 'number',
          placeholder: 'Ej: 5'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Agregar',
          handler: (data) => {
            const cantidad = Number(data.cantidad);
            if (this.insumoSeleccionado && cantidad > 0) {
              this.insumos.push({
                nombre: this.insumoSeleccionado,
                cantidad
              });
              this.insumoSeleccionado = ''; // reset
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async eliminarInsumo(index: number) {
    const alert = await this.alertCtrl.create({
      header: '¿Eliminar insumo?',
      message: `¿Estás seguro de que deseas eliminar el insumo "${this.insumos[index].nombre}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.insumos.splice(index, 1);
          }
        }
      ]
    });

    await alert.present();
  }

  get formularioValido(): boolean {
    return (
      this.tiendaSeleccionada.trim() !== '' &&
      this.anioActual > 0 &&
      this.semanaActual !== null &&
      this.semanaActual >= 1 &&
      this.semanaActual <= 52 &&
      this.insumos.length > 0
    );
  }

  async guardarAsignacion() {
  const alert = await this.alertCtrl.create({
    header: 'Asignación guardada',
    message: 'La asignación de insumos fue registrada correctamente.',
    buttons: ['OK']
  });

  await alert.present();

    this.tiendaSeleccionada = '';
    this.semanaActual = null;
    this.insumos = [];
  }

  get insumosFiltrados(): string[] {
    const yaAgregados = this.insumos.map(i => i.nombre);
    return this.insumosDisponibles.filter(nombre => !yaAgregados.includes(nombre));
  }
}
