import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject, getTestBed } from '@angular/core/testing';

import { RatingService } from './rating.service';
import { FsaApiService } from './fsa-api.service';
import { StoreService } from './store.service';

import { URL, VERSION, ID, PAGE_SIZE, AUTHORITIES, ENG_JSON } from './mocks';

describe('FsaApiService', () => {
  let service: FsaApiService;
  let backend: HttpTestingController;
  let http: HttpClient;
  let storeMock: jasmine.SpyObj<StoreService>;
  let ratingMock: jasmine.SpyObj<RatingService>;

  beforeEach(() => {
    storeMock = jasmine.createSpyObj('store', ['addAuthority', 'saveScore']);
    ratingMock = jasmine.createSpyObj('rating', ['saveScores']);

    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        FsaApiService,
        {provide: RatingService, useValue: ratingMock},
        {provide: StoreService, useValue: storeMock}
      ]
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
        url: `${URL}Establishments?localAuthorityId=${ID}&pageSize=${PAGE_SIZE}&pageNumber=1`,
        method: 'GET'
      });
    });

    it('attaches an x-api-version header', () => {
      const req = backend.expectOne(`${URL}Establishments?localAuthorityId=${ID}&pageSize=${PAGE_SIZE}&pageNumber=1`);
      expect(req.request.headers.has('x-api-version')).toBeTruthy();
    });

    it('sets the x-api-version to 2 by default', () => {
      const req = backend.expectOne(`${URL}Establishments?localAuthorityId=${ID}&pageSize=${PAGE_SIZE}&pageNumber=1`);
      expect(req.request.headers.get('x-api-version')).toBe(VERSION);
    });

    it('sends the response to the ratingService to be parsed', () => {
      const req = backend.expectOne(`${URL}Establishments?localAuthorityId=${ID}&pageSize=${PAGE_SIZE}&pageNumber=1`);
      req.flush(ENG_JSON);
      expect(ratingMock.saveScores).toHaveBeenCalled();
    });

    it('sends the response to the storeService to be saved', () => {
      const req = backend.expectOne(`${URL}Establishments?localAuthorityId=${ID}&pageSize=${PAGE_SIZE}&pageNumber=1`);
      req.flush(ENG_JSON);
      expect(storeMock.saveScore).toHaveBeenCalled();
    });
  });

  describe('#getAuthorities', () => {
    beforeEach(() => {
      service.getAuthorities();
    });

    afterEach(() => {
      backend.verify();
    });

    it('sends a GET request', () => {
      const req = backend.expectOne({
        url: `${URL}authorities/basic`,
        method: 'GET'
      });
    });

    it('Parses the response from the API', () => {
      const req = backend.expectOne(`${URL}authorities/basic`);
      req.flush(AUTHORITIES);
      expect(storeMock.addAuthority).toHaveBeenCalled();
    });
  });
});
