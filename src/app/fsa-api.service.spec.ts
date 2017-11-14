import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject, async, getTestBed } from '@angular/core/testing';

import { RatingService } from './rating.service';
import { FsaApiService } from './fsa-api.service';


describe('FsaApiService', () => {
  const URL = 'http://api.ratings.food.gov.uk/Establishments';
  const VERSION = '2';
  const JSON_MOCK = {
    establishments: [
      { RatingValue: 5 },
      { RatingValue: 2 },
    ],
  };

  let service: FsaApiService;
  let backend: HttpTestingController;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [FsaApiService, RatingService]
    });

    service = TestBed.get(FsaApiService);
    http = TestBed.get(HttpClient);
    backend = TestBed.get(HttpTestingController);
  });

  describe('Constructor', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('Has a version set to 2 by default', () => {
      expect(service.version).toBe(VERSION);
    });

    it('Has a default URL correctly set', () => {
      expect(service.url).toBe(URL);
    });
  });

  describe('#getScores', () => {
    afterEach(() => {
      backend.verify();
    });

    it('sends a GET request', () => {
      service.getScores(100, 1758);

      const req = backend.expectOne({
        url: `${URL}?localAuthorityId=100&pageSize=1758&pageNumber=1`,
        method: 'GET'
      });

      req.flush(JSON_MOCK);
    });

    it('attaches an x-api-version header', () => {
      service.getScores(100, 1758);

      const req = backend.expectOne(`${URL}?localAuthorityId=100&pageSize=1758&pageNumber=1`);
      expect(req.request.headers.has('x-api-version')).toBeTruthy();
    });

    it('sets the x-api-version to 2 by default', () => {
      service.getScores(100, 1758);

      const req = backend.expectOne(`${URL}?localAuthorityId=100&pageSize=1758&pageNumber=1`);
      expect(req.request.headers.get('x-api-version')).toBe(VERSION);
    });
  });
});
