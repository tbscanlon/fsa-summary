import { TestBed, inject } from '@angular/core/testing';

import { RatingService } from './rating.service';

describe('RatingService', () => {
  const engJsonMock = {
    establishments: [
      {RatingValue: 5},
      {RatingValue: 2},
    ],
  };

  const sctJsonMock = {
    establishments: [
      {RatingValue: 'Pass'},
      {RatingValue: 'Needs Improvement'},
    ],
  };

  let service: RatingService;

  beforeEach(() => {
    service = new RatingService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#saveScores', () => {
    describe('English Ratings', () => {
      beforeEach(() => {
        service.saveScores(engJsonMock);
        length = Object.keys(service.scores).length;
      });

      it('saves a score for a new rating', () => {
        expect(service.scores[5]).toBe(1);
      });

      it('does not add new keys to object on repeated scores', () => {
        service.saveScores(engJsonMock);
        expect(Object.keys(service.scores).length).toEqual(length);
      });
    });

    describe('Scottish Ratings', () => {
      beforeEach(() => {
        service.saveScores(sctJsonMock);
        length = Object.keys(service.scores).length;
      });

      it('saves a score for a new rating', () => {
        expect(service.scores['Pass']).toBe(1);
      });

      it('does not add new keys to object on repeated scores', () => {
        service.saveScores(sctJsonMock);
        expect(Object.keys(service.scores).length).toEqual(length);
      });

      it('increments existing key on repeated scores', () => {
        service.saveScores(sctJsonMock);
        expect(service.scores['Pass']).toBe(2);
      });
    });
  });
});
