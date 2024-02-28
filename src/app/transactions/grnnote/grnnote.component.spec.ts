import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GRNNoteComponent } from './grnnote.component';

describe('GRNNoteComponent', () => {
  let component: GRNNoteComponent;
  let fixture: ComponentFixture<GRNNoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GRNNoteComponent]
    });
    fixture = TestBed.createComponent(GRNNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
