import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InsumosInventarioPage } from './insumos-inventario.page';

describe('InsumosInventarioPage', () => {
  let component: InsumosInventarioPage;
  let fixture: ComponentFixture<InsumosInventarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InsumosInventarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
