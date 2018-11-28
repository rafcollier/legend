import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnternewsComponent } from './enternews.component';

describe('EnternewsComponent', () => {
  let component: EnternewsComponent;
  let fixture: ComponentFixture<EnternewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnternewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnternewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
