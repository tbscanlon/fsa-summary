import { TestBed, inject } from '@angular/core/testing';

import { RatingService } from './rating.service';
import { StoreService } from './store.service';

import { ENG_JSON, ENG_RETURN_OBJECT, SCT_JSON } from './mocks';

describe('RatingService', () => {
  let service: RatingService;
  let storeMock;

  beforeEach(() => {
    storeMock = jasmine.createSpyObj('store', ['saveScore']);
    TestBed.configureTestingModule({
      providers: [RatingService, {provide: StoreService, useValue: storeMock}]
    });

    service = TestBed.get(RatingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#saveScores', () => {
    it('Parses and returns a score', () => {
      expect(service.saveScores(ENG_JSON)).toEqual(ENG_RETURN_OBJECT);
    });

    it('resets the score when called', () => {
      service.saveScores(ENG_JSON);
      expect(service.saveScores(ENG_JSON)).toEqual(ENG_RETURN_OBJECT);
    });

    describe('English Ratings', () => {
      beforeEach(() => {
        service.saveScores(ENG_JSON);
        length = Object.keys(service.scores).length;
      });

      it('saves a score for a new rating', () => {
        expect(service.scores[5]).toBe(1);
      });

      it('does not add new keys to object on repeated scores', () => {
        service.saveScores(ENG_JSON);
        expect(Object.keys(service.scores).length).toEqual(length);
      });
    });

    describe('Scottish Ratings', () => {
      beforeEach(() => {
        service.saveScores(SCT_JSON);
        length = Object.keys(service.scores).length;
      });

      it('saves a score for a new rating', () => {
        expect(service.scores['Pass']).toBe(1);
      });

      it('does not add new keys to object on repeated scores', () => {
        service.saveScores(SCT_JSON);
        expect(Object.keys(service.scores).length).toEqual(length);
      });
    });
  });
});
