import { Component, OnInit } from '@angular/core';
import { InsumosService } from 'src/app/services/insumos.service';

@Component({
  selector: 'app-insumos-inventario',
  templateUrl: './insumos-inventario.page.html',
  styleUrls: ['./insumos-inventario.page.scss'],
  standalone: false,
})
export class InsumosInventarioPage implements OnInit {

  insumos: any[] = [];
  terminoBusqueda: string = '';
  insumosFiltrados: any[] = [];

  constructor(private insumosService: InsumosService) { }

  ngOnInit() {

    this.insumosService.obtenerInsumos().subscribe(data => {
    this.insumos = data;
    this.insumosFiltrados = [...this.insumos]; // Inicializa con todos
    } );

    this.insumosService.obtenerInsumos().subscribe(data => {
      this.insumos = data;
    });
  }

  filtrarInsumos() {
    const termino = this.terminoBusqueda.toLowerCase();
    this.insumosFiltrados = this.insumos.filter(insumo =>
      insumo.nombre.toLowerCase().includes(termino)
    );
  }

}
