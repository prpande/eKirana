import { TestBed } from '@angular/core/testing';

import { OrderRestEndpointsService } from '../services/order-rest-endpoints.service';

describe('OrderRestEndpointsService', () => {
  let service: OrderRestEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderRestEndpointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
