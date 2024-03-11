import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoeingNgxGraphComponent } from './boeing-ngx-graph.component';

describe('BoeingNgxGraphComponent', () => {
  let component: BoeingNgxGraphComponent;
  let fixture: ComponentFixture<BoeingNgxGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoeingNgxGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoeingNgxGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
