import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceListingComponent } from './source-listing.component';

describe('SourceListingComponent', () => {
  let component: SourceListingComponent;
  let fixture: ComponentFixture<SourceListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SourceListingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SourceListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
