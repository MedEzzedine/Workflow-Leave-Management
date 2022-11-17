import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeRecuComponent } from './demande-recu.component';

describe('DemandeRecuComponent', () => {
  let component: DemandeRecuComponent;
  let fixture: ComponentFixture<DemandeRecuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeRecuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeRecuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
