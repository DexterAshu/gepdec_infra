import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalBidComponent } from './technical-bid.component';

describe('TechnicalBidComponent', () => {
  let component: TechnicalBidComponent;
  let fixture: ComponentFixture<TechnicalBidComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TechnicalBidComponent]
    });
    fixture = TestBed.createComponent(TechnicalBidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
