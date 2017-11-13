import { HttpClientModule } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

import { FsaApiService } from './fsa-api.service';

const URL = 'http://api.ratings.food.gov.uk/Establishments';
const VERSION = '2';

describe('FsaApiServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [FsaApiService]
    });
  });

  describe('Constructor', () => {
    it('should be created', inject([FsaApiService], (service: FsaApiService) => {
      expect(service).toBeTruthy();
    }));

    it('Has a version set to 2 by default', inject([FsaApiService], (service: FsaApiService) => {
      expect(service.version).toBe(VERSION);
    }));

    it('Has a default URL correctly set', inject([FsaApiService], (service: FsaApiService) => {
      expect(service.url).toBe(URL);
    }));
  });
});
