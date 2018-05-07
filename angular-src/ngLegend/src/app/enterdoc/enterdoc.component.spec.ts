import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterdocComponent } from './enterdoc.component';

describe('EnterdocComponent', () => {
  let component: EnterdocComponent;
  let fixture: ComponentFixture<EnterdocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterdocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterdocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
