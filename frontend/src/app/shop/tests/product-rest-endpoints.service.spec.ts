import { TestBed } from '@angular/core/testing';

import { ProductRestEndpointsService } from '../services/product-rest-endpoints.service';

describe('ProductRestEndpointsService', () => {
  let service: ProductRestEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductRestEndpointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
