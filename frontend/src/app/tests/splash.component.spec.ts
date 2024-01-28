import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplashComponent } from '../components/splash/splash.component';

describe('SplashComponent', () => {
  let component: SplashComponent;
  let fixture: ComponentFixture<SplashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SplashComponent]
    });
    fixture = TestBed.createComponent(SplashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
