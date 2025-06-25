import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InsumosPickingPage } from './insumos-picking.page';

describe('InsumosPickingPage', () => {
  let component: InsumosPickingPage;
  let fixture: ComponentFixture<InsumosPickingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InsumosPickingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
