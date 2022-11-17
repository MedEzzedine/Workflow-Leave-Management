import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlldemandeComponent } from './alldemande.component';

describe('AlldemandeComponent', () => {
  let component: AlldemandeComponent;
  let fixture: ComponentFixture<AlldemandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlldemandeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlldemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
