import { TestBed } from '@angular/core/testing';

import { NotemakerService } from './notemaker.service';

describe('NotemakerService', () => {
  let service: NotemakerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotemakerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
