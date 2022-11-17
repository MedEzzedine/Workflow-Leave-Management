import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompeleteRegisterComponent } from './compelete-register.component';

describe('CompeleteRegisterComponent', () => {
  let component: CompeleteRegisterComponent;
  let fixture: ComponentFixture<CompeleteRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompeleteRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompeleteRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
