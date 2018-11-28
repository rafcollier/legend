import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterletterComponent } from './enterletter.component';

describe('EnterletterComponent', () => {
  let component: EnterletterComponent;
  let fixture: ComponentFixture<EnterletterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterletterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
