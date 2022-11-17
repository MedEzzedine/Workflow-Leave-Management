import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeFinalDecisionComponent } from './demande-final-decision.component';

describe('DemandeFinalDecisionComponent', () => {
  let component: DemandeFinalDecisionComponent;
  let fixture: ComponentFixture<DemandeFinalDecisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeFinalDecisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeFinalDecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
