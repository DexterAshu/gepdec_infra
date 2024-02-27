import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialBidComponent } from './financial-bid.component';

describe('FinancialBidComponent', () => {
  let component: FinancialBidComponent;
  let fixture: ComponentFixture<FinancialBidComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinancialBidComponent]
    });
    fixture = TestBed.createComponent(FinancialBidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
