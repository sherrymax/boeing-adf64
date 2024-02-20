import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignatureViewerStencilComponent } from './signature-viewer-stencil.component';

describe('SignatureViewerStencilComponent', () => {
  let component: SignatureViewerStencilComponent;
  let fixture: ComponentFixture<SignatureViewerStencilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignatureViewerStencilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignatureViewerStencilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
