import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InsumosDistribuirPage } from './insumos-distribuir.page';

describe('InsumosDistribuirPage', () => {
  let component: InsumosDistribuirPage;
  let fixture: ComponentFixture<InsumosDistribuirPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InsumosDistribuirPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
