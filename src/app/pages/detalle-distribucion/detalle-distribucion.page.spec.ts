import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleDistribucionPage } from './detalle-distribucion.page';

describe('DetalleDistribucionPage', () => {
  let component: DetalleDistribucionPage;
  let fixture: ComponentFixture<DetalleDistribucionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleDistribucionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
