import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineIssueConfigComponent } from './online-issue-config.component';

describe('OnlineIssueConfigComponent', () => {
  let component: OnlineIssueConfigComponent;
  let fixture: ComponentFixture<OnlineIssueConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineIssueConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineIssueConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
