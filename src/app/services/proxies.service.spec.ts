import { TestBed } from '@angular/core/testing';

import { ProxiesService } from './proxies.service';

describe('ProxiesService', () => {
  let service: ProxiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProxiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
