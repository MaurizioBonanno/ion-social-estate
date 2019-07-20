import { TestBed } from '@angular/core/testing';

import { FirestoreDbService } from './firestore-db.service';

describe('FirestoreDbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirestoreDbService = TestBed.get(FirestoreDbService);
    expect(service).toBeTruthy();
  });
});
