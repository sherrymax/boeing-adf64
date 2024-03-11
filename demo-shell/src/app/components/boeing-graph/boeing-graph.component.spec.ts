import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoeingGraphComponent } from './boeing-graph.component';

describe('BoeingGraphComponent', () => {
  let component: BoeingGraphComponent;
  let fixture: ComponentFixture<BoeingGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoeingGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoeingGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
