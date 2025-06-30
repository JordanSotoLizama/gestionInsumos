import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RedirectorPage } from './redirector.page';

describe('RedirectorPage', () => {
  let component: RedirectorPage;
  let fixture: ComponentFixture<RedirectorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
