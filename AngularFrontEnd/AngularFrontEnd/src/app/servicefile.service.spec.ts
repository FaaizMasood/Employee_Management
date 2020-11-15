import { TestBed } from '@angular/core/testing';

import { ServicefileService } from './servicefile.service';

describe('ServicefileService', () => {
  let service: ServicefileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicefileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
