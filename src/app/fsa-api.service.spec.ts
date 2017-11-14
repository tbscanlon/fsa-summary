import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject, async, getTestBed } from '@angular/core/testing';

import { RatingService } from './rating.service';
import { FsaApiService } from './fsa-api.service';


describe('FsaApiService', () => {
  const URL = 'http://api.ratings.food.gov.uk/Establishments';
  const VERSION = '2';
  const ID = 1;
  const PAGE_SIZE = 1;

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
    beforeEach(() => {
      service.getScores(ID, PAGE_SIZE);
    });
    afterEach(() => {
      backend.verify();
    });

    it('sends a GET request', () => {
      const req = backend.expectOne({
        url: `${URL}?localAuthorityId=${ID}&pageSize=${PAGE_SIZE}&pageNumber=1`,
        method: 'GET'
      });
    });

    it('attaches an x-api-version header', () => {
      const req = backend.expectOne(`${URL}?localAuthorityId=${ID}&pageSize=${PAGE_SIZE}&pageNumber=1`);
      expect(req.request.headers.has('x-api-version')).toBeTruthy();
    });

    it('sets the x-api-version to 2 by default', () => {
      const req = backend.expectOne(`${URL}?localAuthorityId=${ID}&pageSize=${PAGE_SIZE}&pageNumber=1`);
      expect(req.request.headers.get('x-api-version')).toBe(VERSION);
    });
  });
});
