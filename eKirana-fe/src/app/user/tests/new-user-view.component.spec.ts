import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserViewComponent } from '../components/new-user-view/new-user-view.component';

describe('NewUserViewComponent', () => {
  let component: NewUserViewComponent;
  let fixture: ComponentFixture<NewUserViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewUserViewComponent]
    });
    fixture = TestBed.createComponent(NewUserViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
