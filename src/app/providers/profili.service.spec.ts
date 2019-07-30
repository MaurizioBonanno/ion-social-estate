import { TestBed } from '@angular/core/testing';

import { ProfiliService } from './profili.service';

describe('ProfiliService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfiliService = TestBed.get(ProfiliService);
    expect(service).toBeTruthy();
  });
});
