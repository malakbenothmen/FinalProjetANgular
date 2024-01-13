import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceEtudComponent } from './espace-etud.component';

describe('EspaceEtudComponent', () => {
  let component: EspaceEtudComponent;
  let fixture: ComponentFixture<EspaceEtudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EspaceEtudComponent]
    });
    fixture = TestBed.createComponent(EspaceEtudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
