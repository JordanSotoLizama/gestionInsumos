import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InsumosHistorialPage } from './insumos-historial.page';

describe('InsumosHistorialPage', () => {
  let component: InsumosHistorialPage;
  let fixture: ComponentFixture<InsumosHistorialPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InsumosHistorialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
