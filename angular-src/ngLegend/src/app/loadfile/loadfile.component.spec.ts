import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadfileComponent } from './loadfile.component';

describe('LoadfileComponent', () => {
  let component: LoadfileComponent;
  let fixture: ComponentFixture<LoadfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
