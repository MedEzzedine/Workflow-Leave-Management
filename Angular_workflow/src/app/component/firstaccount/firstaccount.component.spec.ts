import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstaccountComponent } from './firstaccount.component';

describe('FirstaccountComponent', () => {
  let component: FirstaccountComponent;
  let fixture: ComponentFixture<FirstaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstaccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
