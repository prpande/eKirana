import { TestBed } from '@angular/core/testing';

import { IndiaStatesService } from '../services/india-states.service';

describe('IndiaStatesService', () => {
  let service: IndiaStatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndiaStatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
