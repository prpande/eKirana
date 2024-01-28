import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsViewComponent } from '../components/user-details-view/user-details-view.component';

describe('UserDetailsViewComponent', () => {
  let component: UserDetailsViewComponent;
  let fixture: ComponentFixture<UserDetailsViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserDetailsViewComponent]
    });
    fixture = TestBed.createComponent(UserDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
