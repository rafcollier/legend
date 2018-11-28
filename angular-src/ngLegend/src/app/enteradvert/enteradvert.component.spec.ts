import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnteradvertComponent } from './enteradvert.component';

describe('EnteradvertComponent', () => {
  let component: EnteradvertComponent;
  let fixture: ComponentFixture<EnteradvertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnteradvertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnteradvertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
