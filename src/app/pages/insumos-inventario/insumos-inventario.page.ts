import { Component, OnInit } from '@angular/core';
import { InsumosService, Insumo } from 'src/app/services/insumos.service';

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
     this.insumosService.getInsumos().subscribe(data => {
      this.insumos = data;
      this.insumosFiltrados = data;
    });

  }

  filtrarInsumos() {
    const termino = this.terminoBusqueda.toLowerCase();
    this.insumosFiltrados = this.insumos.filter(insumo =>
      insumo.nombre.toLowerCase().includes(termino)
    );
  }

}
