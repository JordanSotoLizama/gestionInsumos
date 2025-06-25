import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InsumosEntradaPage } from './insumos-entrada.page';

describe('InsumosEntradaPage', () => {
  let component: InsumosEntradaPage;
  let fixture: ComponentFixture<InsumosEntradaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InsumosEntradaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
