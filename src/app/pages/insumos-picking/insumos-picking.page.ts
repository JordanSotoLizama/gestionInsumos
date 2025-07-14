import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SelectorTiendaComponent } from 'src/app/components/selector-tienda/selector-tienda.component';
import { AlertController } from '@ionic/angular'; 
import { InsumosService, Insumo } from 'src/app/services/insumos.service';
import { TiendaService, Tienda } from 'src/app/services/tienda.service';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

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

  insumoSeleccionado: string = '';

  insumosDisponibles: Insumo[] = [];
  tiendas: Tienda[] = [];

  insumos: { id: string; nombre: string; cantidad: number }[] = [];


  get semanaInvalida(): boolean {
  return (
    this.semanaActual !== null &&
    (this.semanaActual < 1 || this.semanaActual > 52)
  );
 }

  constructor(private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private insumosService: InsumosService,
    private tiendaService: TiendaService,
    private firestore: Firestore,
    private auth: Auth
  ) {}

  ngOnInit() {
    this.cargarInsumos();
    this.cargarTiendas();
  }

  cargarInsumos() {
    this.insumosService.getInsumos().subscribe(data => {
      this.insumosDisponibles = data;
      console.log('Insumos cargados desde Firebase:', data);
   });
  }

  cargarTiendas() {
    this.tiendaService.getTiendas().subscribe(data => {
      this.tiendas = data;
      console.log('Tiendas cargadas desde Firebase:', data);
    });
  }

  async abrirSelectorTienda() {
    const modal = await this.modalCtrl.create({
      component: SelectorTiendaComponent,
      componentProps: {
        tiendas: this.tiendas.map(t => t.nombre)
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
              const insumoData = this.insumosDisponibles.find(i => i.nombre === this.insumoSeleccionado);
              if (insumoData) {
               this.insumos.push({
                id: insumoData.id,
                nombre: insumoData.nombre,
                cantidad
              });
            }
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
    const paquete = {
      tienda: this.tiendaSeleccionada,
      semana: this.semanaActual,
      anio: this.anioActual,
      insumos: this.insumos,
      creadoPor: this.auth.currentUser?.email || 'desconocido',
      uid: this.auth.currentUser?.uid || '',
      distribuido: false
    };

    try {
      const paquetesRef = collection(this.firestore, 'paquetes-pickeados');
      await addDoc(paquetesRef, paquete);

      const alert = await this.alertCtrl.create({
        header: 'Asignación guardada',
        message: 'La asignación fue registrada correctamente en Firebase.',
        buttons: ['OK']
      });
      await alert.present();

      // Reiniciar formulario
      this.tiendaSeleccionada = '';
      this.semanaActual = null;
      this.insumos = [];

    } catch (error) {
      console.error("Error al guardar paquete:", error);
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Ocurrió un error al guardar el paquete.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  get insumosFiltrados(): string[] {
    const yaAgregados = this.insumos.map(i => i.nombre);
    return this.insumosDisponibles
      .map(i => i.nombre)
      .filter(nombre => !yaAgregados.includes(nombre));
  }
}
