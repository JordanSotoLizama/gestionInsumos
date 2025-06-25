import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InsumosEvidenciasPage } from './insumos-evidencias.page';

describe('InsumosEvidenciasPage', () => {
  let component: InsumosEvidenciasPage;
  let fixture: ComponentFixture<InsumosEvidenciasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InsumosEvidenciasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
