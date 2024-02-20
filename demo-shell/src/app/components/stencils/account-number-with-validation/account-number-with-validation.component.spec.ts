import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountNumberWithValidationComponent } from './account-number-with-validation.component';

describe('AccountNumberWithValidationComponent', () => {
  let component: AccountNumberWithValidationComponent;
  let fixture: ComponentFixture<AccountNumberWithValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountNumberWithValidationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountNumberWithValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
