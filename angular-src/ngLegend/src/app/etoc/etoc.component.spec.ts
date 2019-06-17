import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtocComponent } from './etoc.component';

describe('EtocComponent', () => {
  let component: EtocComponent;
  let fixture: ComponentFixture<EtocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
