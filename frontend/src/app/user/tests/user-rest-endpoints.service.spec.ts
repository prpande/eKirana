import { TestBed } from '@angular/core/testing';

import { UserRestEndpointsService } from '../services/user-rest-endpoints.service';

describe('UserRestEndpointsService', () => {
  let service: UserRestEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRestEndpointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
