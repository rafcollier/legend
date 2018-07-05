import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicksectionComponent } from './picksection.component';

describe('PicksectionComponent', () => {
  let component: PicksectionComponent;
  let fixture: ComponentFixture<PicksectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PicksectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicksectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
