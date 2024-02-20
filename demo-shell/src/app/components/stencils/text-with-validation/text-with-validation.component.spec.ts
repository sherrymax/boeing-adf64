import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextWithValidationComponent } from './text-with-validation.component';

describe('TextWithValidationComponent', () => {
  let component: TextWithValidationComponent;
  let fixture: ComponentFixture<TextWithValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextWithValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextWithValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
