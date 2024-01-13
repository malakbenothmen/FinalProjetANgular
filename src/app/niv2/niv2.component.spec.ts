import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Niv2Component } from './niv2.component';

describe('Niv2Component', () => {
  let component: Niv2Component;
  let fixture: ComponentFixture<Niv2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Niv2Component]
    });
    fixture = TestBed.createComponent(Niv2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
