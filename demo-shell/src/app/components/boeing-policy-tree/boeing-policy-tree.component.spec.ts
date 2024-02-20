import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoeingPolicyTreeComponent } from './boeing-policy-tree.component';

describe('BoeingPolicyTreeComponent', () => {
  let component: BoeingPolicyTreeComponent;
  let fixture: ComponentFixture<BoeingPolicyTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoeingPolicyTreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoeingPolicyTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
