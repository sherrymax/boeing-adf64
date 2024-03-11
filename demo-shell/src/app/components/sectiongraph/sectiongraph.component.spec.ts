import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectiongraphComponent } from './sectiongraph.component';

describe('NetworkgraphComponent', () => {
  let component: SectiongraphComponent;
  let fixture: ComponentFixture<SectiongraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectiongraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectiongraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
