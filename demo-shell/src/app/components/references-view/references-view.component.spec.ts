import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferencesViewComponent } from './references-view.component';

describe('ReferencesViewComponent', () => {
  let component: ReferencesViewComponent;
  let fixture: ComponentFixture<ReferencesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferencesViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferencesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
