import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoeingOrgComponent } from './boeing-org.component';

describe('BoeingOrgComponent', () => {
  let component: BoeingOrgComponent;
  let fixture: ComponentFixture<BoeingOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoeingOrgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoeingOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
