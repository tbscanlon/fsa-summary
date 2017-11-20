import { Authority } from './authority.model';
import { TestBed, inject } from '@angular/core/testing';

import { StoreService } from './store.service';

describe('StoreService', () => {
  const MOCK_AUTHORITY = new Authority(100, 'Testville', 500);
  const MOCK_SCORES = {
    2: 1,
    5: 1
  };

  let store: StoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoreService]
    });

    store = TestBed.get(StoreService);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  it('Constructs with an empty authorities array', () => {
    expect(store.authorities.length).toBe(0);
  });

  describe('#addAuthority', () => {
    beforeEach(() => {
      store.addAuthority(1, 'Test Authority', 100);
    });

    it('Creates an authority', () => {
      expect(store.authorities.length).toBe(1);
    });
  });

  describe('#saveScore', () => {
    beforeEach(() => {
      store.addAuthority(100, 'Testville', 500);
      store.saveScore(100, MOCK_SCORES);
    });

    it('Saves a score object to the selected Authority', () => {
      expect(store.authorities[0].scores).toEqual(MOCK_SCORES);
    });

    it('Throws an error if the Authority cannot be found', () => {
      expect(() => {
        store.saveScore(200, MOCK_SCORES);
      }).toThrowError('Authority not Found');
    });
  });
});
