import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InsumosEvidenciasPage } from './insumos-evidencias.page';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { EvidenciasService } from 'src/app/services/evidencias.service'; 


const mockEvidenciasService = {
  getEvidencias: () => of([
    { tienda: 'Puente Alto', anio: 2024, semana: 25 },
    { tienda: 'Maipú', anio: 2024, semana: 26 },
    { tienda: 'Ñuñoa', anio: 2023, semana: 20 },
    { tienda: 'La Florida', anio: 2024, semana: 21 },
  ])
};

fdescribe('InsumosEvidenciasPage', () => {
  let component: InsumosEvidenciasPage;
  let fixture: ComponentFixture<InsumosEvidenciasPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsumosEvidenciasPage],
      imports: [
        IonicModule.forRoot(),
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: EvidenciasService, useValue: mockEvidenciasService } 
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InsumosEvidenciasPage);
    component = fixture.componentInstance;
    fixture.detectChanges(); // se ejecuta ngOnInit()
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('debería filtrar evidencias por término de búsqueda', () => {
    component.terminoBusqueda = 'puente';
    const filtradas = component.evidenciasFiltradas;
    expect(filtradas.length).toBe(1);
    expect(filtradas[0].tienda).toBe('Puente Alto');
  });

  fit('debería retornar todas si el término está vacío', () => {
    component.terminoBusqueda = '';
    const filtradas = component.evidenciasFiltradas;
    expect(filtradas.length).toBe(4);
  });

  fit('debería filtrar por semana o año también', () => {
    component.terminoBusqueda = '2024';
    const filtradas = component.evidenciasFiltradas;
    expect(filtradas.length).toBeGreaterThan(1);
    expect(filtradas.every(e => e.anio === 2024)).toBeTrue();
  });
});