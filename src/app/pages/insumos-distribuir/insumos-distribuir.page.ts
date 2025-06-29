import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insumos-distribuir',
  templateUrl: './insumos-distribuir.page.html',
  styleUrls: ['./insumos-distribuir.page.scss'],
  standalone: false,
})


export class InsumosDistribuirPage implements OnInit {


  terminoBusqueda: string = '';

  distribuciones: any[] = [
    { tienda: 'Tienda 1', semana: 12, anio: 2024 },
    { tienda: 'Tienda 2', semana: 11, anio: 2024 },
    { tienda: 'Tienda 3', semana: 12, anio: 2024 },
    { tienda: 'Tienda 4', semana: 13, anio: 2024 }
  ];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  get distribucionesFiltradas(): any[] {
    const termino = this.terminoBusqueda.toLowerCase();
    return this.distribuciones.filter(d =>
      d.tienda.toLowerCase().includes(termino)
    );

  
}

irADetalle(d: any) {
  const tienda = encodeURIComponent(d.tienda);
  const semana = d.semana;
  const anio = d.anio;

  this.router.navigate([`/detalle-distribucion/${tienda}/${semana}/${anio}`]);
}

}
