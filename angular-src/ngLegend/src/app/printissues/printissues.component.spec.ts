import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintissuesComponent } from './printissues.component';

describe('PrintissuesComponent', () => {
  let component: PrintissuesComponent;
  let fixture: ComponentFixture<PrintissuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintissuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintissuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
