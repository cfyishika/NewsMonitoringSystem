import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoriesListingComponent } from './stories-listing.component';

describe('StoriesListingComponent', () => {
  let component: StoriesListingComponent;
  let fixture: ComponentFixture<StoriesListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoriesListingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoriesListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
