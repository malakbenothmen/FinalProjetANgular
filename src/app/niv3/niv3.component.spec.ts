import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Niv3Component } from './niv3.component';

describe('Niv3Component', () => {
  let component: Niv3Component;
  let fixture: ComponentFixture<Niv3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Niv3Component]
    });
    fixture = TestBed.createComponent(Niv3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
