import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Niv1Component } from './niv1.component';

describe('Niv1Component', () => {
  let component: Niv1Component;
  let fixture: ComponentFixture<Niv1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Niv1Component]
    });
    fixture = TestBed.createComponent(Niv1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
