import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DistribuirService, PaquetePickeado } from 'src/app/services/distribuir.service';

@Component({
  selector: 'app-insumos-distribuir',
  templateUrl: './insumos-distribuir.page.html',
  styleUrls: ['./insumos-distribuir.page.scss'],
  standalone: false,
})


export class InsumosDistribuirPage implements OnInit {

  distribuciones: PaquetePickeado[] = [];
  terminoBusqueda: string = '';

  constructor(
    private router: Router,
    private distribuirService: DistribuirService,
  ) { }

  ngOnInit() {
    this.distribuirService.getPaquetes().subscribe(data => {
      this.distribuciones = data;
      console.log('Paquetes cargados:', data);
    });
  }

  get distribucionesFiltradas(): PaquetePickeado[] {
    return this.distribuciones.filter(d =>
      d.tienda.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
    );
  }

  irADetalle(paquete: PaquetePickeado) {
    this.router.navigate([
      '/detalle-distribucion',
      paquete.tienda,
      paquete.semana,
      paquete.anio,
      paquete.id
    ]);
  }

}
