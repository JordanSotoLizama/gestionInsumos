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

  constructor(private insumosService: InsumosService) { }

  ngOnInit() {

    this.insumosService.obtenerInsumos().subscribe(data => {
      this.insumos = data;
    });
  }

}
