import { TestBed, inject } from '@angular/core/testing';

import { StoreService } from './store.service';

describe('StoreService', () => {
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
});
